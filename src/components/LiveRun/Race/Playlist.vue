<template>
  <div class="playlist">
    <box>
      <box-content>
        <div class="playlist__current">
          <div class="flex">
            <div class="info">
              <div class="title">MUSIC PLAYLIST</div>
              <div class="name-playlist">Sunset Playlist Pop</div>
            </div>
            <div class="icon">
                💽
            </div>
          </div>
        </div>
        <div class="playlist__now-playing">
          <div class="title">
            NOW PLAYING
          </div>
          <div class="music-name">
            Paused while not stream...
          </div>
          <div class="music-status">
            Paused while not streaming
          </div>
        </div>
      </box-content>
    </box>
  </div>
</template>

<script>
import Box from '@/components/Box/Box'
import BoxContent from '@/components/Box/BoxContent'

export default {
  name: 'playlist',
  components: { Box, BoxContent }
}
</script>
