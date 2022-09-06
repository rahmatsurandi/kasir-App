import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Format } from '../utils/format'
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const ModalKeranjang = ({
    showModal,
    handleClose,
    keranjangDetail,
    jumlah,
    keterangan,
    tambah,
    kurang,
    cangeHandler,
    handleSubmit,
    totalHarga,
    hapusPesanan
}) => {
    if (keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {keranjangDetail.product.nama}{" "}
                        <strong>(Rp.{Format(keranjangDetail.product.harga)})</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Harga</Form.Label>
                            <p>(Rp.{Format(totalHarga)})</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Jumlah Harga</Form.Label>
                            <br />
                            <Button variant="primary" size="sm" className="ml-4" onClick={() => kurang()}>
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <strong>
                                {jumlah}
                            </strong>
                            <Button variant="primary" size="sm" className='mr-3' onClick={() => tambah()}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                name="keterangan"
                                placeholder="contoh : pedas,nasi setengah,"
                                value={keterangan}
                                onCange={(e) => cangeHandler(e)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            simpan
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
                        <FontAwesomeIcon icon={faTrash} /> hapus pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    } else {
        return (

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>kosong</Modal.Title>
                </Modal.Header>
                <Modal.Body>kosong</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        )
    }




}

export default ModalKeranjang