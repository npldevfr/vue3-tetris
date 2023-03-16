<script lang="ts" setup>
const user = useSupabaseUser()
const {auth} = useSupabaseAuthClient()
</script>

<template>
  <div v-if="user">{{ user.user_metadata.full_name }}</div>
  <div v-else @click="auth.signInWithOAuth({ provider: 'discord' })">Se connecter avec discord</div>
  <TetrisGameLayout/>
</template>

<style lang="scss" scoped>
* {
  color: white;
}
</style>