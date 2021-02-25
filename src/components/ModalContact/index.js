import React, { useState } from 'react';
import axios from 'axios'
import { FormGroup, Form, Input, Row, Col, Button, ModalBody } from 'reactstrap';

import { Container, Error } from './styles'

const Index = ({showContact, setShowContact}) => {
    const initial_state = { nome: '', email: '', assunto: '', mensagem: '', error: '', tipo: 0}
    const [ state, setState ] = useState(initial_state)
    const [ resContact, setResContact ] = useState(false);

    const closeModal = () => {
        setState(initial_state)
        setResContact(false)
        setShowContact()
    }

    const submit = async (e) => {
        e.preventDefault()
        const { nome, email } = state
        if(!nome || !email ) {
            setState({...state, error: 'Nome ou e-mails não foram preenchidos.'})
        } else {
            axios.post('https://lamusic-platform-backend.herokuapp.com/contato', {...state})
            .then( res => {
                if (res.data ) {
                    setResContact('Mensagem enviada com sucesso.')
                }
            })
            .catch( error => {
                console.log(error.response)
                setResContact(error.response.data.message)}
            )
        }
    }



  return (
    
      <Container isOpen={showContact} toggle={setShowContact} >
        <ModalBody>
            {resContact ?
                <>
                    <h1 style={{fontSize: '26px'}}>{resContact}</h1>
                    <div className="modal-footer">
                        <Button className="submit" onClick={closeModal}>Fechar</Button>
                    </div>
                </>
            : 
            <Form onSubmit={submit}>
                <h1>Entre em contato</h1>
                <Error>{state.error}</Error>
                <Row>
                    <Col>
                        <FormGroup>
                            <label>Nome</label>
                            <Input
                                required
                                placeholder="Nome Completo"
                                type="text"
                                value={state.nome}
                                onChange={e => setState({...state, nome: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                </Row>                        
                <Row>
                    <Col>
                        <FormGroup>
                            <label>E-mail</label>
                            <Input
                                required
                                placeholder="email@contato.com"
                                type="text"
                                value={state.email}
                                onChange={e => setState({...state, email: e.target.value })}
                            />
                        </FormGroup>
                    </Col>
                </Row>                        
                <Row>
                    <Col>
                        <FormGroup>
                        <label> Assunto</label>
                        <Input 
                            required
                            placeholder="Assunto"
                            type="text"
                            value={state.assunto}
                            onChange={e => setState({...state,assunto: e.target.value})} 
                            />
                        </FormGroup>
                    </Col>
                </Row> 
                <Row>
                    <Col>
                        <FormGroup className="d-flex flex-column">
                        <label>Mensagem</label>
                        <textarea 
                            required
                            type="textarea"
                            rows="5"
                            value={state.mensagem}
                            onChange={e => setState({...state,mensagem: e.target.value})} 
                        />
                        </FormGroup>
                    </Col>
                </Row> 
                <FormGroup className="mb-4 modal-footer">
                    <Button className="cancel" onClick={setShowContact}>Cancelar</Button>{' '}
                    <Button className="submit" type="submit">Enviar</Button>
                </FormGroup>
            </Form>
        }
        </ModalBody>
      </Container>
  );
}

export default Index;