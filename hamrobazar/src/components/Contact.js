import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import Navmenu from './Navmenu'
import Footer from './home/Footer'

class Contact extends Component {
    constructor(props) {
        super(props)

        this.state = {
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            notLoggedIn: false
        }
    }

    // config:{     headers:{'Authorization':`Bearer
    // ${localStorage.getItem('token')}`}

    componentWillMount()
    {
        if (localStorage.getItem('token')) {
            this.setState({
                token: localStorage.getItem('token')
            })

        } else {
            this.setState({notLoggedIn: true})
        }
    }
    // componentDidMount() {
    //     axios
    //         .get('http://localhost:3001/users/me', this.state.config
    //     )
    //         .then((response) => {})
    //         .catch((err) => {})
    // }

    render() {
            if(this.state.notLoggedIn)
            {
                <Redirect to="/login"/>
            } 
        return (
            <div>
                <Navmenu/>
           <Container>
                
                <h1>Contact Us</h1>

                <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam voluptas, rem deleniti sunt, excepturi beatae error illum asperiores quod, amet fugit delectus. Illum est ullam quasi magnam! Sapiente, officia accusamus.
                Officiis dolorum reprehenderit optio dolor sunt, ipsa labore pariatur modi ad eos repellendus possimus. Quis sunt veritatis quibusdam quaerat facilis eius consequuntur possimus qui, quisquam, laborum incidunt, quia quo cum?
                Obcaecati sed est doloremque molestiae odio officiis ut, consectetur vel laudantium, iure illo, delectus vitae quo? Et voluptates amet ad! Iste hic, sit a ea praesentium natus ratione voluptates aspernatur.
                Dolorem neque ullam reiciendis dolore ex impedit natus magnam nam dolor, odit beatae, minima consequatur fuga. Ratione quibusdam quaerat, quo ex ipsam sunt tempora? Laborum ea eos deserunt delectus assumenda.
                Pariatur, nam culpa quia voluptas beatae incidunt quas itaque, officia placeat officiis consequatur quisquam excepturi harum corporis ipsam nisi quasi in sequi esse voluptate ut ducimus, amet praesentium deleniti. Amet!
                Facere quidem ullam inventore enim obcaecati! Consectetur, ipsa deleniti cupiditate eos mollitia itaque earum voluptates adipisci ducimus incidunt dolore sit rem explicabo odio! Pariatur cupiditate, perferendis quis vero adipisci maiores?
                Sunt nobis hic soluta, ipsam rem cupiditate iusto fugiat blanditiis cum repudiandae expedita minus sit sed commodi ipsa distinctio maiores error praesentium enim, voluptates labore quo odio sapiente qui? Exercitationem.
                Accusamus autem necessitatibus, doloribus sed quod aliquid, voluptas obcaecati itaque, veniam vitae distinctio voluptates magnam! Molestiae quos explicabo numquam magni incidunt ad expedita repellat, excepturi, ratione delectus, officiis illo laboriosam.
                Iure repellat corrupti, cumque blanditiis in qui eaque aliquam natus fuga suscipit quos rem vel voluptate quaerat quia dolores, laborum facere expedita, adipisci illo iste? Provident eligendi nam minima magnam!
                Adipisci magnam fugiat officia odio saepe suscipit ut quasi deserunt iste, itaque ab et eum assumenda excepturi ducimus ipsum doloremque quis! Ab, consequuntur illo? Iusto delectus voluptatem nulla facilis tempore!</span>
                </Container>
                <Footer/>
                </div>
        )
    }
}

export default Contact
