import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import { ListCategory, Hasil, Menus } from '../components/index';
import axios from 'axios';
import { API_URL } from '../utils/constans';
import swal from 'sweetalert'
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menus: [],
            categoryYangDipilih: "Makanan",
            keranjangs: [],
        }
    }
    componentDidMount() {
        axios.get(API_URL + "products?category.nama=" + this.state.categoryYangDipilih).then((res) => {
            const menus = res.data
            this.setState({ menus })
        })
            .catch((err) => {
                console.log(err)
            })

        // hasil
        this.getListKeranjang();
    }

    getListKeranjang = () => {
        axios.get(API_URL + "keranjangs").then((res) => {
            const keranjangs = res.data
            this.setState({ keranjangs })
        })
            .catch((err) => {
                console.log(err)
            })
    }

    // cange kategory
    changeCategori = (value) => {
        this.setState({
            categoryYangDipilih: value,
            menus: []
        })
        axios.get(API_URL + "products?category.nama=" + value).then((res) => {
            const menus = res.data
            this.setState({ menus })
        })
            .catch((err) => {
                console.log(err)
            })
    }
    // masuk keranjang
    masukKeranjang = (value) => {
        axios.get(API_URL + "keranjangs?products.id=" + value.id).then((res) => {
            if (res.data.length === 0) {
                const keranjang = {
                    jumlah: 1,
                    total_harga: value.harga,
                    product: value
                }
                // post keranjang
                axios.post(API_URL + "keranjangs", keranjang).then((res) => {
                    swal({
                        title: "sukses masuk keranjang",
                        text: "sukses masuk keranjang " + keranjang.product.nama,
                        icon: "success",
                        Button: false,
                        timer: 1000,
                    })

                })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                const keranjang = {
                    jumlah: res.data[0].jumlah + 1,
                    total_harga: res.data[0].total_harga + value.harga,
                    product: value,
                }
                // put keranjang
                axios.put(API_URL + "keranjangs/" + res.data[0].id, keranjang).then((res) => {
                    swal({
                        title: "sukses masuk keranjang",
                        text: "sukses masuk keranjang " + keranjang.product.nama,
                        icon: "success",
                        Button: false,
                        timer: 1000,
                    })

                })
                    .catch((err) => {
                        console.log(err)
                    })
            }


        })
            .catch(err => {
                console.log(err)
            })

        // const  keranjang
        const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
        }
        axios.post(API_URL + "keranjangs", keranjang).then((res) => {
            this.getListKeranjang();
            swal({
                title: "sukses masuk keranjang",
                text: "sukses masuk keranjang " + keranjang.product.nama,
                icon: "success",
                Button: false
            })

        })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        const { menus, categoryYangDipilih, keranjangs } = this.state
        return (
            <div>
                <Row mt="2" className="py-2">
                    <ListCategory changeCategori={this.changeCategori} categoryYangDipilih={categoryYangDipilih} />
                    <Col mt="2" className="shadow-lg text-center" >
                        <h4 className="text-white"><strong>Daftar Menu</strong></h4>
                        <Row className="overflow-auto menu">
                            {
                                menus && menus.map((menu) => (
                                    <Menus
                                        key={menu.id}
                                        menu={menu}
                                        masukKeranjang={this.masukKeranjang}
                                    />
                                ))
                            }
                        </Row>
                    </Col>
                    <Hasil keranjangs={keranjangs} {...this.props} />
                </Row>
            </div>
        )
    }
}





