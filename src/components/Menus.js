import React from 'react'
import { Format } from '../utils/format'
import { Card, Col } from 'react-bootstrap'


const Menus = ({ menu, masukKeranjang }) => {
    return (
        <Col md={4} xs={6} className=" mb-4 shadow-lg">
            <Card className="bg-black shadow-lg text-white" onClick={() => masukKeranjang(menu)}>
                <Card.Img variant="top" src={"/image/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
                <Card.Body>
                    <Card.Title>{menu.nama}</Card.Title>
                    <Card.Text>
                        Rp.{Format((menu.harga))}
                    </Card.Text>

                </Card.Body>
            </Card>
        </Col>

    )
}
export default Menus;