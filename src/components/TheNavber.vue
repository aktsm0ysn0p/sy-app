<template>
  <nav>
    <ul>
      <li>
        <router-link to="/" exact exact-active-class="active-home">
          <font-awesome-icon icon="home" size="2x" class="home" />
          <p>Home</p>
        </router-link>
      </li>
      <li>
        <router-link to="/stocks" active-class="active-stocks">
          <font-awesome-icon icon="heart" size="2x" class="heart" />
          <p>Likes</p>
        </router-link>
      </li>
      <li>
        <router-link to="/folders" active-class="active-folders">
          <font-awesome-icon icon="folder" size="2x" class="folder" />
          <p>Lists</p>
        </router-link>
      </li>
      <li>
        <router-link to="/mypage" active-class="active-out">
          <font-awesome-icon icon="user" size="2x" class="out" />
          <p>Mypage</p>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
nav {
  padding: 10px 0;
  background: #172a4c;
  @media (max-width: 767px) {
    position: fixed;
    bottom: 0;
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
        .home:hover,
        &.active-home .home {
          color: #7389F0;
        }
        .heart:hover,
        &.active-stocks .heart {
          color: #e23e4e;
        }
        .folder:hover,
        &.active-folders .folder {
          color: #77F895;
        }
        .out:hover,
        &.active-out .out {
          color: pink;
        }
      }
    }
  }
}
</style>
