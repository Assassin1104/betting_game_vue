<template>
  <div style="overflow-x: hidden;">
    
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            This page is not allowed for your current membership plan.
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12" lg="6">
                Please upgrade your plan <a :href="membership_pg_url" target="_blank" >here</a> or contact the administrator
              </CCol>
            </CRow>
            <br/>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>


  export default {
    name: 'Membership',   
    data () {
      return {
        membership_pg_url: ''
        
      }
    },
    created() {
      //this.authorize()
      this.getMembershipUrl()
    },
    methods: {
      authorize() {
        const token = localStorage.getItem("token");
        console.log(token);
        if(!token){
          this.$router.push("/pages/login")
        } else {
          const response = fetch(`${process.env.VUE_APP_URL}api/users/authorize`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('response', response)
        }
      },
      getMembershipUrl() {
        let apiURL = `${process.env.VUE_APP_URL}api/pagesetting/membership_url`;
        axios
          .get(apiURL)
          .then((res) => {
            this.membership_pg_url = res.data[0].url;
            
            
          })
          .catch((error) => {
            console.log(error);
          });
      },
      color (value) {
        let $color
        if (value <= 25) {
          $color = 'info'
        } else if (value > 25 && value <= 50) {
          $color = 'success'
        } else if (value > 50 && value <= 75) {
          $color = 'warning'
        } else if (value > 75 && value <= 100) {
          $color = 'danger'
        }
        return $color
      }
    }
  }
</script>
