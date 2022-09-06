import React, { Component } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Format } from '../utils/format'
import TotalBayar from '../components/TotalBayar'
import ModalKeranjang from './ModalKeranjang'
import axios from 'axios';
import { API_URL } from '../utils/constans';
import swal from 'sweetalert'

export default class Hasil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
            totalHarga: 0
        }
    }
    HandleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga

        })
    }
    handleClose = () => {
        this.setState({
            showModal: false
        })
    }
    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }
    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)

            })
        }
    }
    changeHandler = (e) => {
        this.setState({
            keterangan: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.handleClose()
        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        }
        axios.put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data).then((res) => {
            swal({
                title: "update pesanan",
                text: "sukses suksess update pesanan " + data.product.nama,
                icon: "success",
                Button: false,
                timer: 1000,
            })

        })
            .catch((err) => {
                console.log(err)
            })
    }
    hapusPesanan = (id) => {
        this.handleClose();

        axios
            .delete(API_URL + "keranjangs/" + id)
            .then((res) => {
                swal({
                    title: "Hapus Pesanan!",
                    text:
                        "Sukses Hapus Pesanan " + this.state.keranjangDetail.product.nama,
                    icon: "error",
                    button: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                console.log("Error yaa ", error);
            });
    };
    render() {
        const { keranjangs } = this.props
        return (

            <Col md={3} mt="2" className="text-center ">
                <h4><strong className="text-white">Hasil</strong></h4>
                {keranjangs.length !== 0 && (
                    <Card className="overflow-auto hasil">
                        <ListGroup variant="flush">
                            {keranjangs.map((menuKeranjang) => (

                                <ListGroup.Item key={menuKeranjang.id} onClick={() => this.HandleShow(menuKeranjang)}>
                                    <Row>
                                        <Col xs={2}>
                                            <h5>
                                                <Badge pill variant="success">
                                                    {menuKeranjang.jumlah}
                                                </Badge>
                                            </h5>
                                        </Col>
                                        <Col>
                                            <h5>{menuKeranjang.product.nama}</h5>
                                            <p>Rp.{Format(menuKeranjang.product.harga)}</p>
                                        </Col>
                                        <Col>
                                            <strong className='float-end'>Rp.{Format(menuKeranjang.total_harga)}</strong>
                                        </Col>
                                    </Row>

                                </ListGroup.Item>


                            ))}
                            <ModalKeranjang
                                handleClose={this.handleClose}
                                {...this.state}
                                tambah={this.tambah}
                                kurang={this.kurang}
                                changeHandler={this.changeHandler}
                                handleSubmit={this.handleSubmit}
                                hapusPesanan={this.hapusPesanan}
                            />

                        </ListGroup>
                    </Card>

                )}
                <TotalBayar keranjangs={keranjangs} {...this.props} />

            </Col>


        )
    }
}
