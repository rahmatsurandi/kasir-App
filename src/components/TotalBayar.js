import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Format } from '../utils/format'
import { API_URL } from '../utils/constans'
import { Link } from 'react-router-dom'

export default class TotalBayar extends Component {


    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }
        axios.post(API_URL + 'pesanans', pesanan).then((res) => {
            this.props.history.push('/sukses')
        })

    }
    render() {
        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);
        return (
            // web
            <>
                <div className="fixed-bottom d-none d-md-block" >
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4">

                            <h4 className="text-black">Total bayar <strong className="float-right mr-2 text-black">Rp.{Format(totalBayar)}</strong></h4>
                            <div className="d-grid gap-1">
                                <Button
                                    variant="primary"
                                    className="mb-2 mt-4 mr-2 text-black" size="lg"
                                    onClick={() => this.submitTotalBayar(totalBayar)}
                                    as={Link} to='/sukses'>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    <strong className="ml-10 text-black">Bayar</strong>
                                </Button>
                            </div>

                        </Col>
                    </Row>

                </div>
                {/* mobile */}
                <div className="d-sm-block d-md-none" >
                    <Row>
                        <Col md={{ span: 3, offset: 9 }} className="px-4">

                            <h4 className="text-black">Total bayar <strong className="float-right mr-2 text-black">Rp.{Format(totalBayar)}</strong></h4>
                            <div className="d-grid gap-1">
                                <Button
                                    variant="primary"
                                    className="mb-2 mt-4 mr-2 text-black" size="lg"
                                    onClick={() => this.submitTotalBayar(totalBayar)}
                                    as={Link} to='/sukses'>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    <strong className="ml-10 text-black">Bayar</strong>
                                </Button>
                            </div>

                        </Col>
                    </Row>

                </div>
            </>

        )
    }
}
