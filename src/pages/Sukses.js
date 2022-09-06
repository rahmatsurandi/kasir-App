import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/constans'
export default class Sukses extends Component {
    componentDidMount() {
        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                keranjangs.map(function (item) {
                    return axios
                        .delete(API_URL + "keranjangs/" + item.id)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error))
                })
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    }
    render() {
        return (
            <div className="container-fluid text-white mt-4 text-center">
                <Image src="./image/sukses.svg" width="300" />
                <h2>sukses pesan</h2>
                <p>terimakasih sudah memesan</p>
                <Button className="" variant="primary" as={Link} to="/">
                    kembali
                </Button>
            </div>
        )
    }
}
