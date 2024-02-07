import * as Tone from 'tone'

class FilterChain {
    constructor() {
      this.filters = new Map()
      this.outputGain = new Tone.Gain()
    }

  getFilters(){
      return this.filters;
  }
  getFilter(id){
        return this.filters.get(id)
    }

    setFilter(id,filter){
        this.filters.get(id).filter.set(filter)
    }
    addFilter(id){

        const filterObj = {
            filter: new Tone.Filter({
                frequency:200,
                type: "lowpass",
                rolloff: -12,
                Q: 1,
            }),
            input: new Tone.Gain(0.5),
            output: new Tone.Gain(0.5),
            compressor : new Tone.Compressor({
                threshold: -10,
                ratio:5,
                attack:0,
                release:0.3,
                knee:40
            }),
            chained: false
        };

        filterObj.input.connect(filterObj.compressor)
        filterObj.compressor.connect(filterObj.output)
        filterObj.output.connect(this.outputGain)
        filterObj.filter.connect(filterObj.compressor)
        this.filters.set(id,filterObj)
    }

    connectToFilter(id,node){
        node.connect(this.filters.get(id).input)
    }
    connect(node){
        this.outputGain.connect(node)
    }
    chainFilter(id){

        if(!this.filters.get(id).chained){
            this.filters.get(id).input.disconnect()
            this.filters.get(id).input.connect(this.filters.get(id).filter)
            this.filters.get(id).chained = true
        }
    }
    unchainFilter(id){

        const filterObj = this.filters.get(id)

        if(filterObj.chained){
            filterObj.input.disconnect()
            filterObj.filter.disconnect()
            filterObj.input.connect(filterObj.output)
            filterObj.chained = false
            this.filters.set(id,filterObj)
        }
    }

}
export default FilterChain
