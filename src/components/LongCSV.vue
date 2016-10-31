<template>
  <div class="longcsv">
    <div class="row row-eq-height">
      <div class="col-sm-7">
        <h2>① Paste from Excel</h2>
        <p>Want to see a sample? Try 
        <a href="#" @click.prevent="loadSample1">column grouping</a> or 
        <a href="#" @click.prevent="loadSample2">nested graphs</a>.
        </p>
        <div v-if="content" class="well">
          <p>
            Connect
            <select v-model="nameCol" @change="update">
              <option value="">Select an option</option>
              <option v-for="field in fields">
                {{ field }}
              </option>
            </select>
            to/with
            <select v-model="edgeCol" @change="update">
              <option value="">Select an option</option>
              <option v-for="field in fields">
                {{ field }}
              </option>
            </select>
          </p>

            <p v-if="hasColumns">
            Can a <strong>{{ edgeCol }}</strong> also be a <strong>{{ nameCol }}</strong>?
            <select v-model="graphType" @change="update">
              <option value="simple">Yes</option>
              <option value="bigraph">No</option>
            </select>
            </p>

            <p v-if="hasColumns"> The relationship is described by
              <select v-model="edgeTypeCol" @change="update">
                <option value="">None</option>
                <option v-for="field in fields">
                  {{ field }}
                </option>
              </select>
            </p>

            <p v-if="hasColumns && graphType === 'bigraph'">
            Connect <strong>{{ nameCol }}</strong> to 
            <select v-model="preserveBigraph" @change="update">
              <option value="no">other {{ nameCol }} nodes</option>
              <option value="yes">{{ edgeCol }} nodes</option>
            </select>
            </p>

            <p v-if="hasColumns && graphType">
              <span>
                <input v-model="preserveData" type="checkbox"  @change="update"> Preserve additional data 
              </span><br>
              <span v-if="couldBeDirected">
                <input v-model="directed" type="checkbox" value="false"  @change="update"> Directed
              </span>
            </p>
          </div>

          <textarea v-model="content" @input="parse" placeholder="Hello, friend! Paste your CSV in here."></textarea>
      </div>

      <div class="col-sm-5 preview">
        <h2>② Take a peek</h2>
        <p>Get an idea of what your network looks like.</p>
        <VizPreview :json="json"></VizPreview>
      </div>
    </div>

      <h2>③ Download your network-ized data</h2>
      <p><strong>Which do you need?</strong> It depends on what you're doing!</p>
      <p>The <code>.json</code> is for d3 or Sigma.js, <code>.gexf</code> is for Gephi, and I think that <code>nodes.csv</code> and <code>edges.csv</code> are just generally useful for one thing or another.</p>
      <p>Everything gets <code>weight</code> based on the number of connections between nodes, but right now only the JSON exports the relationship categories.</p>
      <div class="row">
        <OutputDisplay 
          description=".json (d3/Sigma.js)" 
          filename="output.json"
          :content="json" />
        <OutputDisplay 
          description=".gexf (Gephi)" 
          filename="output.gexf"
          :content="gexf" />
        <OutputDisplay 
          description="edges.csv" 
          filename="edges.csv"
          :content="edgeCsv" />
        <OutputDisplay 
          description="nodes.csv" 
          filename="nodes.csv"
          :content="nodeCsv" />
      </div>
</template>

<script>
import Papa from 'PapaParse'
import Connection from '../models/connection'
import EdgeComputer from '../models/edge_computer'
import Generator from '../models/generator'
import VizPreview from './VizPreview'
import OutputDisplay from './OutputDisplay'
import Samples from '../models/samples'
// import BipartiteEdgeComputer from '../models/bipartite_edge_computer'

export default {
  name: 'longcsv',
  components: {
    VizPreview,
    OutputDisplay
  },
  data () {
    return {
      content: null,
      fields: [],
      nameCol: null,
      edgeCol: null,
      edgeCsv: null,
      nodeCsv: null,
      gexf: null,
      json: null,
      graphType: 'bigraph',
      directed: false,
      preserveData: true,
      preserveBigraph: 'no',
      edgeTypeCol: null
    }
  },
  watch: {
    graphType (graphType) {
      this.directed = graphType === 'simple'
    }
  },
  computed: {
    couldBeDirected () {
      return this.graphType === 'simple' || (this.graphType === 'bigraph' && this.preserveBigraph === 'yes')
    },
    hasColumns () {
      return this.edgeCol && this.nameCol
    }
  },
  methods: {
    loadSample1 () {
      this.content = Samples.bipartite.content
      this.parse()
      for (let key of Object.keys(Samples.bipartite)) {
        this[key] = Samples.bipartite[key]
      }
      this.update()
    },
    loadSample2 () {
      this.content = Samples.nested.content
      this.parse()
      for (let key of Object.keys(Samples.nested)) {
        this[key] = Samples.nested[key]
      }
      this.update()
    },
    error (msg) {
      console.log(msg)
    },

    parse () {
      this.parsed = Papa.parse(this.content, {
        header: true
      })
      this.fields = this.parsed.meta.fields
      this.update()
    },

    update () {
      if (!this.nameCol || !this.edgeCol) {
        return
      }

      const connections = this.parsed.data.map(d => new Connection(d, this.nameCol, this.edgeCol, this.edgeTypeCol))

      const computer = new EdgeComputer(connections, {
        preserveBigraph: this.preserveBigraph === 'yes',
        bigraph: this.graphType === 'bigraph',
        directed: this.directed
      })

      const generator = new Generator(computer)

      this.json = generator.generate('json')
      this.gexf = generator.generate('gexf')
      this.edgeCsv = generator.generate('csv-edges')
      this.nodeCsv = generator.generate('csv-nodes')
    }
  }
}
</script>

<style scoped>
h2 {
  margin-top: 50px;
}
textarea {
  width: 100%;
  height: 200px;
}
.row-eq-height {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.preview {
  overflow-x: hidden;
}
.longcsv {
  padding-bottom: 50px;
}
</style>