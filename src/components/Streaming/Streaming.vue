<template>
  <box>
    <box-content>
      <div class="streaming">
        <div class="title">
          STREAMING AND VOICE
        </div>
        <div class="flex">
          <div class="microphone">
            <button>
              <span class="icon icon--microphone">
                🎙
              </span>
            </button>
          </div>
          <div class="test-microphone">
            <button class="btn btn--gray btn--large btn--block">Test Microphone</button>
          </div>
        </div>
        <status></status>
      </div>
    </box-content>
  </box>
</template>

<script>
import Box from '@/components/Box/Box'
import BoxContent from '@/components/Box/BoxContent'
import Status from '@/components/Streaming/Status'

export default {
  name: 'streaming',
  components: { Box, BoxContent, Status }
}
</script>
