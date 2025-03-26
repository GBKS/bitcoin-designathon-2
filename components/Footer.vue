<template>
  <footer class="footer -section">
    <a href="https://bitcoin.design" title="Bitcoin Design">
      <img
        src="~/assets/images/seal.svg"
        alt="Bitcoin design community logo"
      />
    </a>
    <p>Brought to you by the<br><b><a href="https://bitcoin.design">Bitcoin Design Community</a></b></p>
    <ul>
      <li><p><a href="https://bitcoin.design" target="_blank" rel="me">Visit our site</a></p></li>
      <li><p><a href="https://twitter.com/bitcoin_design" target="_blank" rel="me">Twitter</a></p></li>
      <li><p><a href="https://bitcoindesign.substack.com" target="_blank" rel="me">Newsletter</a></p></li>
      <li><p><a href="https://bitcointv.com/a/bitcoin_design/video-channels" target="_blank" rel="me">BitcoinTV</a> & <a href="http://youtube.com/c/BitcoinDesign" target="_blank" rel="me">YouTube</a></p></li>
      <li><p><a href="https://github.com/GBKS/bitcoin-designathon" target="_blank" rel="nofollow noindex">Code on Github</a></p></li>
    </ul>
  </footer>
</template>

<script>
export default {

  props: [
    'title',
    'description',
    'link',
    'linkLabel',
    'color'
  ]

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.footer {
  gap: 0;

  p {
    margin-top: 10px;
    text-align: center;
    @include mixins.r('font-size', 18, 22);

    b {
      color: var(--front);
      font-weight: 900;

      a {
        color: var(--front);
        text-decoration: none;
        transition: all 100ms animations.$ease; 

        &:hover {
          color: var(--palette-0);
        }
      }
    }
  }

  ul {
    margin: 15px 0 0 0;
    padding: 0;
    list-style-type: none;

    li {
      p {
        @include mixins.r('font-size', 15, 18);
      }
    }
  }
}

</style>
