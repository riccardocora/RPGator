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
            input: new Tone.Gain(),
            output: new Tone.Gain(),
            chained: false
        };

        filterObj.input.connect(filterObj.output)
        filterObj.output.connect(this.outputGain)
        //filterObj.filter.connect(filterObj.output)
        this.filters.set(id,filterObj)
    }

    connectToFilter(id,node){
        node.connect(this.filters.get(id).input)
    }
    connect(node){
        this.outputGain.connect(node)
    }
    chainFilter(id){
        console.log("chaining filter",id);
        const filterObj = this.filters.get(id)
        console.log("filterObj",filterObj);
        if(!filterObj.chained){
            filterObj.input.disconnect()
            filterObj.input.connect(filterObj.filter)
            filterObj.filter.connect(filterObj.output)
            filterObj.chained = true
            this.filters.set(id,filterObj)
        }
    }
    unchainFilter(id){
        console.log("unchaining filter",id);
        const filterObj = this.filters.get(id)
        console.log("filterObj",filterObj);
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
