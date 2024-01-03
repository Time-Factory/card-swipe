<template>
  <div>
    <van-row type="flex" style="text-align: center; line-height: 50px">
      <van-col span="24">
        <div class="flex-item">
          已刷卡(本机/本线)：<span class="amount red">{{ selfCount }}</span> /
          <span class="amount red">{{ logs.length }}</span>
        </div>
      </van-col>
      <van-col span="24">
        <van-cell
          v-for="(item, i) in logs"
          :key="i"
          :title="item.name"
          :value="item.createdAt"
        ></van-cell>
      </van-col>
    </van-row>

    <van-notify v-model="connected" type="warning">
      <van-icon name="bell" style="margin-right: 4px" />
      <span>已离线</span>
    </van-notify>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'mobile',
})
import io from 'socket.io-client'
import hotkeys from 'hotkeys-js'
import { Howl } from 'howler'
import { includes, find } from 'lodash'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { showSuccessToast, showFailToast } from 'vant'
import { useDayjs } from '#dayjs'

const dayjs = useDayjs()
const selfCount = ref(0)
const lineCount = ref(0)
const unuploadLogs = ref([])
const swipedCards = ref([])
const cards = ref([])
const logs = ref([])
const connected = ref(false)
const cardNo = ref('')
const socket = io()
const howls = {
  success: null,
  reswipe: null,
  invalid: null,
}
// 设备指纹
const fp = await FingerprintJS.load()
const result = await fp.get()
const visitorId = result.visitorId
const setSound = () => {
  console.info('setSound')
  for (const i in howls) {
    howls[i] = new Howl({
      src: [`/sounds/${i}.wav`],
    })
  }
}

const setSwipe = () => {
  console.info('setSwipe')
  const hotk = hotkeys.noConflict()
  hotk('1,2,3,4,5,6,7,8,9,0,enter', function (event, handler) {
    console.info(event, handler)
    switch (handler.key) {
      case '1':
        cardNo.value += '1'
        break
      case '2':
        cardNo.value += '2'
        break
      case '3':
        cardNo.value += '3'
        break
      case '4':
        cardNo.value += '4'
        break
      case '5':
        cardNo.value += '5'
        break
      case '6':
        cardNo.value += '6'
        break
      case '7':
        cardNo.value += '7'
        break
      case '8':
        cardNo.value += '8'
        break
      case '9':
        cardNo.value += '9'
        break
      case '0':
        cardNo.value += '0'
        break
      case 'enter':
        swipe()
        break
    }
  })
}

const voicePrompt = type => {
  console.info('voicePrompt', type)
  console.info('howls', howls)
  console.info('howls[type]', howls[type])
  howls[type].play()
}

// 刷卡
const swipe = () => {
  // 判断是否有卡号
  if (cardNo.value.length < 10) {
    return false
  }
  // 判断是否已刷
  const exist = includes(swipedCards.value, parseInt(cardNo.value))
  console.info('exist', exist)
  if (exist) {
    showFailToast(cardNo.value + ' - 重复刷卡')
    cardNo.value = ''
    voicePrompt('reswipe')
    return false
  }

  // 判断是否可吃饭
  const swipeTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  console.info('swipeTime', swipeTime)
  console.info('cards', cards.value)
  console.info('cardNo', cardNo.value)
  const card = find(cards.value, {
    no: parseInt(cardNo.value),
  })
  console.info('card', card)
  if (!card) {
    showFailToast('无法识别的卡片')
    voicePrompt('invalid')
    cardNo.value = ''
    return false
  }

  showSuccessToast(card.name + ' - 刷卡成功')
  voicePrompt('success')
  const data = {
    id: card.id,
    name: card.name,
    cardNo: card.no,
    createdAt: swipeTime,
    clientId: visitorId,
  }
  if (socket.connected) {
    socket.emit('swipe', data)
  } else {
    unuploadLogs.value.unshift(data)
  }
  logs.value.unshift(data)
  swipedCards.value.push(card.no)
  selfCount.value++
  cardNo.value = ''
}

onMounted(() => {
  socket.on('connect', () => {
    connected.value = socket.connected
  })
  socket.on('disconnect', () => {
    connected.value = socket.connected
  })
  console.info('socket', socket)
  socket.on('cards', data => {
    console.info('cards', data)
    if (data !== undefined) {
      cards.value = data || []
    }
  })
  socket.on('swipe', data => {
    console.info('swipe', data)
    logs.value.unshift(data)
  })
  socket.emit('cards', {
    clientId: visitorId,
  })
  setSound()
  setSwipe()
})
watch(connected, (newValue, oldValue) => {
  connected.value = socket ? !socket.connected : true
})
</script>
