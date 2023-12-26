Vue.component('ai-plugin', {
    props: {
        author: {
            default: 'this is nice',
            type: String,
        },
        api_endpoint_cpu: {
          type: String,
          default: "https://app.modzy.com/api/jobs"
        },
      },
    data(){
      return {
       hello: 'world',
       status: "started",
       jobIdentifier: 'c65a67ec-d5f3-4a95-916e-6dfa35b5b81b',
       markers: [],
      informations:{
         jobIdentifierx: undefined,
      },
       sentim:{
           obj:{
           results:undefined,
           },
           } ,
      }
    },
    computed: {
      getCell(){
          return this.informations.jobIdentifier.results;
       },
        getResults(){
         return this.sentim; 
  
       },
       sentimStatus: function () {
         return this.sentim.results["0001"]["results.json"].data.result.classPredictions[0].score; 
  
       },
       getProp(){
         return this.props;
       },
       getJob(){
         return this.jobIdentifier;
       }
  
  },
    methods: { 
          fetchWeather(){
              fetch('https://api.openweathermap.org/data/2.5/weather?q=manila&appid=04086e1e40f5e8aad7854a1b88547698'
              )
              .then((res) => res.json())
              .then((res) => {
                    this.informations= res;
                    console.log(res);
              });
          },
          fetchSentiment(){
              
              this.status = "loading";
         
              var api_endpoint = this.api_endpoint_cpu
              var auth_txt = this.author
  
              var myHeaders = new Headers();
         myHeaders.append("Authorization", "ApiKey Uk8BAMu80fFE3ra4fLLX.U9VPP8K2fyUg82gyfpxT");
         myHeaders.append("Content-Type", "application/json");
       
                   var raw = JSON.stringify({"model":{"identifier":"ed542963de","version":"1.0.1"},"input":{"type":"text","sources":{"0001":{"input.txt":auth_txt}}}});
       
                   var requestOptions = {
                     method: 'POST',
                     headers: myHeaders,
                     body: raw,
                     redirect: 'follow'
                   };
       
       
       
                    fetch('https://app.modzy.com/api/jobs',requestOptions
                   )
                   .then((res) => res.json())
                   .then((res) => {
                         this.jobIdentifier = res.jobIdentifier
                         this.informations.jobIdentifierx = res.jobIdentifier
                         console.log(res.jobIdentifier);
                   });
               },
  
               fetchResults(){
                  this.status = "loading";
  
                  var job_endpoint = 'https://app.modzy.com/api/results/' + this.getJob
                    console.log(job_endpoint)
  
                 const options = {
                 method: 'GET',
                 headers: {Accept: 'application/json', Authorization: 'ApiKey Uk8BAMu80fFE3ra4fLLX.U9VPP8K2fyUg82gyfpxT'}
               };
               
               fetch(job_endpoint, options)
                 .then((res) => res.json())
                   .then((res) => {
                         this.sentim= res;
                         console.log(res);
                   });
               
               }
      },
  
    mounted(){
    
      this.fetchSentiment();
      this.fetchResults();
    },
    template:  "  <div > {{getJob}} <p>Using mustaches: <span v-html='rawHtml'></span> {{ <a href='/'>check</a> }}</p></div> " ,
    template:  "  <div > <div style='display:none'>job: {{getJob}}</div> <p> <span v-html='rawHtml'></span> <button  @click='fetchResults' >Submit</button></p><div v-if=' sentimStatus > 0 '>  sentiment: positive  </div><div v-if=' sentimStatus < 0 '>  sentiment: negative  </div></div> " ,


});



var vm = new Vue ({
    el: '#appvue',
    name: 'app',
   
   
});
