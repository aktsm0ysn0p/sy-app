<template>
  <nav>
    <ul>
      <li><router-link to="/" exact exact-active-class="active-home">
      <font-awesome-icon icon="home" size="2x" class="home" />
      <p>Home</p>
      </router-link></li>
      <li><router-link to="/stocks" active-class="active-stocks">
      <font-awesome-icon icon="heart" size="2x" class="heart" />
      <p>Likes</p>
      </router-link></li>
      <li><router-link to="/folders" active-class="active-folders">
      <font-awesome-icon icon="folder" size="2x" class="folder" />
      <p>Lists</p>
      </router-link></li>
    </ul>
  </nav>
</template>

<style lang="scss">
nav {
  padding: 10px 0;
  // background: #FCEE83;
  // background: #5BF077;
  // background: linear-gradient(to bottom right, #5BF077, #407043);
  background: linear-gradient(to bottom right, #a8ff78, #78ffd6);
  @media (max-width: 767px) {
    position: fixed;
    bottom: 0;
    // width: 100%;
    left: 0;
    right: 0;
    opacity: .8;
    z-index: 10;
  }
  ul {
    li {
      a {
        color: #ffffff;
        text-decoration: none;

        // p {

        // }

        .home:hover,
        &.active-home .home {
          // color: #6EEBF0;
          color: #7389F0;
        }

        .heart:hover,
        &.active-stocks .heart {
          // color: #D29EF0;
          color: #F06F85;
        }

        .folder:hover,
        &.active-folders .folder {
          // color: #F0A06E;
          color: #F0C84F;
        }
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
