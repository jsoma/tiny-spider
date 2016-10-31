<template>
  <div>
    <div class="masthead">
      <div class="container">
        <h1>📈 🕷 🕸</h1>
        <h1>A Tiny Spider's Network Data Converter</h1>
        <p class="callout">You paste from <strong>Excel</strong> or <strong>Google Sheets</strong>, we group your data together and send back some network-y, graph-y files, perfect for <strong>visualization or analysis</strong> in Gephi or D3 or whatever else floats your interconnectedness boat.</p>
      </div>
    </div>
    <div class="container">
      <LongCSV></LongCSV>
    </div>
    <div class="note">
      <div class="container">
        <h4>I'm making a YouTube series about network visualization!</h4>
        <p>Sign up for <a href="http://tinyletter.com/jsoma">my never-ever-sent newsletter</a> to find out when it's out and about.
      </div>
    </div>
    <div class="footer">
      <div class="container">
        <div class="col-sm-12 col-md-6">
            <p><strong>Hi, I'm Soma</strong></p>
            <p>I run a <a href="http://brooklynbrainery.com">fake school in Brooklyn</a> and a <a href="http://ledeprogram.com">data journalism program</a> at Columbia University's Journalism School.</p>
            <p>I also co-host talks about food science and culture in a semi-monthly lecture series called <a href="http://omgmsg.com">Masters of Social Gastronomy</a>. <a href="https://soundcloud.com/msgpodcast">We have a podcast</a> that doesn't get updated nearly often enough.</p>
        </div>
<div class="col-sm-6 col-md-3">

            <p><strong>Track me down</strong></p>
            <p><a target="_new" href="mailto:jonathan.soma@gmail.com">jonathan.soma@gmail.com</a>
            / <a target="_new" href="https://twitter.com/dangerscarf">@dangerscarf</a>
            / <a target="_new" href="http://jonathansoma.com">jonathansoma.com</a>
            / <a target="_new" href="https://github.com/jsoma">GitHub</a>
            / <a target="_new" href="https://www.youtube.com/channel/UCg3t2I9DIsU1HxNOHoPcLlw">Youtube</a>
            / <a target="_new" href="http://tinyletter.com/jsoma">TinyLetter</a>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import LongCSV from './LongCSV'

export default {
  name: 'parent',
  components: {
    LongCSV
  }
}
</script>

<style scoped>
textarea {
  font-family: Inconsolata, "Courier New";
}
.masthead {
  background: #c6f6f6;
  padding: 30px 0;
}
.footer {
  padding: 30px 0;
  background: linear-gradient(141deg, #12e5d7 0%, #21d6eb 51%, #2fc0f5 75%);
  text-align: left;
}
.footer a {
  background: white;
  color: #333;
  padding: 0 3px;
  text-decoration: none;
}
.footer a:hover {
  color: #23527c;
  text-decoration: underline;
}
.note {
  background: #fffcc0;
  padding: 15px 0;
  margin-bottom: 15px;
}
</style>