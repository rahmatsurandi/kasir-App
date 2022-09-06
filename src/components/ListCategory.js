import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../utils/constans'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Icon = ({ nama }) => {
    if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
    if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="" />
    if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />
    return <FontAwesomeIcon icon={faUtensils} className="mt-2" />

}


export default class ListCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],

        }
    }
    componentDidMount() {
        axios.get(API_URL + "categories").then(res => {
            const categories = res.data
            this.setState({ categories })
        })
            .catch(err => {
                console.log(err)
            })

    }



    render() {
        const { categories } = this.state
        const { changeCategori, categoryYangDipilih } = this.props
        return (

            <Col md={2} mt='' className=" text-center py-2 shadow-lg">
                <h4 className='mt-10 text-white'><strong>Daftar kategory</strong></h4>
                {
                    categories.map((category, index) => (

                        <ListGroup as="ul" key={index} >

                            <ListGroup.Item as="li"
                                onClick={() => changeCategori(category.nama)}
                                className={categoryYangDipilih === category.nama && "category-aktif"}

                            >
                                <h4 >
                                    <Icon nama={category.nama} /> {category.nama}
                                </h4>
                            </ListGroup.Item>
                        </ListGroup>
                    ))
                }
            </Col>
        )
    }
}
