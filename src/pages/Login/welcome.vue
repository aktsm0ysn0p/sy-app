<template>
  <div class="welcome-page">
    <div class="container">
      <div class="img-wrapper">
        <div class="img-text">
          <h1>Welcome!</h1>
          <p>Famous quotes App</p>
        </div>
        <img src="../../assets/img/IMG_4392.png" alt="" class="quote-img">
      </div>
      <div>


      </div>

      <router-link to="/signup">新規登録</router-link>
      <router-link to="/signin">サインイン</router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'welcome'
}
</script>

<style lang="scss" scoped>

@function get_vw($size, $viewport:320){
  $rate: 100 / $viewport;
  @return $rate * $size * 1vw;
}

@mixin fz_vw($font_size:10){
  font-size: $font_size * 1px;
  font-size: get_vw($font_size);
}

$bar-style: solid;
$bar-size: 2px;
$bar-color: #ffffff;

.welcome-page {
  color: #2c3e50;
  background: #F5F5F5;


  .container {
    min-height: 100vh;
    width: 90%;
    display: flex;
    flex-flow: column nowrap;
    // justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 30px;
    @media (max-width: 767px) {
      padding-bottom: 80px;
    }

    .quote-img {
      display: block;
      width: 100%;
      object-fit: fill;
      // position: relative;
      padding-bottom: 10px;
      max-width: 800px;
      margin: 0 auto;
    }

    .img-text {
      margin: 0 auto;
      width: 80%;
      max-width: 800px;
      padding: 20px 0;


      h1 {
        text-align: center;
        padding: 1rem 0;
        @include fz_vw(20);
        @media (min-width: 768px) {
          font-size: 55px;
        }
        // font-family: 'andara';
        font-weight: normal;
      }
      p {
        text-align: center;
        font-family: 'shunnka';
        font-weight: bold;
        @include fz_vw(13);
        @media (min-width: 768px) {
          font-size: 25px;
        }

        .like {
          color: #e23e4e;
          font-family: Avenir, Helvetica, Arial, sans-serif;
          font-weight: bold;
          font-family: 'uchiyama';
        }

      }
      // z-index: 10;
    }

    h2 {
      font-weight: normal;
    }
    a {
      color: #42b983;
      margin: 10px 0;
      padding: 10px;
      font-family: 'zatsu';
    }

    input {
      margin: 10px 0;
      padding: 10px;
    }

    .btn-wrapper {
      padding: 20px 0;
      .button {
        display: inline-block;
        padding: 0.5em 1em;
        text-decoration: none;
        background: #668ad8;/*ボタン色*/
        color: #FFF;
        border-bottom: solid 4px #627295;
        border-radius: 3px;
        width: 20vh;
        transition: all .4s;

        &:hover {
          opacity: .7;
        }
      }
    }

    p {
      margin-top: 10px;
    }
  }

}

</style>
