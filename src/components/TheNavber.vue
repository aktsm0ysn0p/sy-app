<template>
  <nav>
    <ul>
      <li><router-link to="/"><font-awesome-icon icon="home" size="2x" /></router-link></li>
      <li><router-link to="/stocks"><font-awesome-icon icon="heart" size="2x" /></router-link></li>
      <li><router-link to="/folders"><font-awesome-icon icon="folder" size="2x" /></router-link></li>
    </ul>
  </nav>
</template>

<style lang="scss">
nav {
  padding: 10px 0;
  background: salmon;
  @media (max-width: 767px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    opacity: .8;
    z-index: 10;
  }
  ul {
    li {
      a {
        color: #2c3e50;
      }
    }
  }

}

/* header {
  position: fixed;
  top: 0;
  width: 100%;
  opacity: .8;
  z-index: 10;
}

.header-container {
  background-color: #73F06E;
}

.logo {
  width: 50vw;
  margin: 0 auto;
  font-family: cursive;
  font-weight: 800;
  font-size: 2rem;
  color: #ffffff;
  text-align: center;
} */

</style>
