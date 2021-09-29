

export default {
    name: "Signup",
    data() {
        return {
            signup_form : {
                name : '',
                surname : '',
                email : '',
                password : '',
                cfpass :''
            }
        }
    },
    methods : {
        clearForm(){
            this.signup_form = {
                name : '',
                surname : '',
                email : '',
                password : '',
                cfpass :''
            }
        },
        addFrom(){
            let payload = {
                name: this.signup_form.name,
                surname : this.signup_form.surname,
                email : this.signup_form.email,
                password :this.signup_form.password,
                cfpass :this.signup_form.cfpass
            }
            if (this.signup_form.password != this.signup_form.cfpass){
                console.log("error")
            }
            console.log(payload)
            this.clearForm()
        }
    }

}