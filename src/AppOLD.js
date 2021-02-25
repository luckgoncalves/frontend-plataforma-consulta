import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './pages/Header'
import { CircularProgress } from '@material-ui/core'
import { ArrowRightAlt } from '@material-ui/icons'
import { Step, Step2, Step3 } from './pages/Form'
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Footer from './pages/Footer'
import Button, { Link } from './components/Button'
import Who from './pages/Who'
import Editor from './pages/Form/Editors'
import axios from 'axios'
import ModalDados from 'components/ModalConfirm'
import ModalContact from 'components/ModalContact'


import { Container, Body, Steps } from './pages/Layout/styles'

function App() {
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  
  const [ step, setStep ] = useState(0)
  const [ button ] = useState([{context: 'Próximo', color: '#0FBB00'},{context:'Confirmar Dados', color: '#0FBB00'}, {context: 'Ir para site LA Music', color: '#3F3F3F'}])
  const [ disabled, setDisabled ] = useState(false)
  const [ form, setForm ] = useState(store.data)
  const [ show, setShow ] = useState()
  const [ linkContact, setLinkContact ]  = useState(false)
  const [ resp, setResp ] = useState('')
  const [ modalConfirm, setModalConfirm ] = useState(false)
  const [ pathname ] = useState(window.location.pathname)

  useEffect(() => {
    settings()
      async function settings() {
        await dispatch({type: 'SET_PATHNAME', payload: window.location.pathname })
      }
  },[]) //eslint-disable-line

  const handleClose = () => {
    setShow(false)
  };
  const showContact = () => {
    setLinkContact(true)
    setShow(false)
  }

  function checkArtista(state, nomeArtistico) {

    let nome_artistico = state.nome_artistico
  
    let filter =  state.nome_artistico.filter( name => name.indexOf(nomeArtistico) !== -1)
  
        filter.length === 0 && nome_artistico.push(nomeArtistico)
  
    return nome_artistico
  }

  function checkMusic(state, musicas) {

    let lista_musicas = state.lista_musicas
  
    let filter = state.lista_musicas.filter( name => name.indexOf(musicas) !== -1)
  
        filter.length === 0 && lista_musicas.push(musicas)
  
     return lista_musicas
  }
  
  function checkRedeSocial(state, sociais) {
  
    let redes_sociais = state.redes_sociais
  
    let filter = state.redes_sociais.filter( name => name.indexOf(sociais) !== -1)
  
        filter.length === 0 && redes_sociais.push(sociais)
  
     return redes_sociais
  }

  async function submit(){
    const { data, state_form } = store
    let payload = data
    
    payload.nome_artistico = checkArtista(payload, state_form.nome_artistico) 
    payload.redes_sociais = checkRedeSocial(payload, state_form.redes_sociais) 
    payload.lista_musicas = checkMusic(payload, state_form.lista_musicas) 

    setDisabled(true)
    setModalConfirm(false)

    
    try {
      axios.post('https://lamusic-platform-backend.herokuapp.com/credito-retido',{
        ...payload
      })
      .then( res => {
          res.data.msg === 'ok' && setStep(step + 1);
          setDisabled(false);
        }
      )
      .catch(function(err){
        if(err.response.status === 500 || err.response.status === 400 ){
          setResp(`${err.response.data.message} `)
          setShow(true)
          setDisabled(false);
        }
      })
    } catch(error) {
      console.error(error.response)
        setDisabled(false);
    }
  }

  return (
    <Container className="App">

      <Header />
        <div className="my-5 d-flex justify-content-center flex-column align-items-center flex-sm-row" style={{backgroundColor: '#262626', minHeight: '42vh', marginRight: '20px', marginLeft: '20px'}}>
          
          <Body className="d-flex align-items-center justify-content-center order-2 order-sm-2">
            {store.data.who !== 'editors' && store.form && (
              <Steps className="d-flex d-lg-none ml-sm-5 mb-5 ">
                <span onClick={() => step > 0 && setStep(0)} className={`num-Steps mb-0 ${step === 0 ? 'active' : ''}`}>1</span>
                <span onClick={() => step > 1 && setStep(1)} className={`num-Steps mb-0 mx-5 ${step === 1 ? 'active' : ''}`}>2</span>
                <span onClick={() => step === 2 && setStep(2)} className={`num-Steps mb-0 ${step === 2 ? 'active' : ''}`}>3</span>
              </Steps>
            )}
            
            {!store.form && pathname !== '/artista' ? (
              <Who {...store} />
            ) : 
              <>
                
                {step === 0 && (
                  <div id="step-1" className="step-1 step" active={step === 1 ? true : undefined}>
                    <h2 className="AvenirBold">{store.data.who === 'producer' ? 'Dados do Solicitante' : 'Dados do músico'}</h2>
                    <Step callStep={ e => setForm(e)} />
                    <Button 
                      disabled={form.requiredStep1}
                      colorbutton={button[step].color}
                      className="w-100"
                      onClick={e => step < 2 ? setStep(step + 1) : setStep(0)} 
                      text={button[step].context}
                      endIcon={step === 0 && <ArrowRightAlt />} />
                  </div>
                )}
                
                {step === 1 && (
                  <div id="step-2" className="step-2 step" active={step === 2 ? true : undefined}>
                    {store.data.who === 'producer' && <h2 className="AvenirBold">Dados do Artista</h2>}
                    <Step2 callStep={e => setForm(e)} />
                    <Button 
                      disabled={form.requiredStep2}
                      colorbutton={button[step].color}
                      className="w-100"
                      onClick={e => setModalConfirm(!modalConfirm)} 
                      text={button[step].context}
                      endIcon={step === 0 && <ArrowRightAlt />} />
                  </div>
                )}

                {step === 2 && (
                  <div id="step-3" className="step-3 step text-center" active={step === 3 ? true : undefined}>
                    <Step3 />
                    {store.data.who === 'producer' ? (
                      <Link 
                      href='https://consulta.lamusic.com.br/'
                      colorbutton={button[step].color}
                      text={'Realizar nova consulta'}
                      className="w-100"/>
                    ):(
                      <Link 
                      href='https://lamusic.com.br/'
                      colorbutton={button[step].color}
                      text={button[step].context}
                      className="w-100"/>
                    )}
                  </div>
                )}
              </>
            }
          </Body>
          {store.form && (
            <Steps className="d-none d-lg-flex ml-sm-5 flex-row flex-sm-column  ">
              <span onClick={() => step > 0 && setStep(0)} className={`num-Steps ${step === 0 ? 'active' : ''}`}>1</span>
              <span onClick={() => step > 1 && setStep(1)} className={`num-Steps ${step === 1 ? 'active' : ''}`}>2</span>
              <span onClick={() => step >= 2 && setStep(2)} className={`num-Steps ${step === 2 ? 'active' : ''}`}>3</span>
            </Steps>
          )}

          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              {resp}
              <div>
                <span style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={showContact}><b>Entrar em contato</b></span>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <button className="buttonModal" onClick={handleClose}>
                Fechar
              </button>
            </Modal.Footer>
          </Modal>
          <ModalContact showContact={linkContact} setShowContact={() => setLinkContact(!linkContact)} />

        </div>
        <ModalDados modalConfirm={modalConfirm} submit={() => submit()} setModalConfirm={() => setModalConfirm(!modalConfirm)} />
        {disabled && (
          <div className="d-block" style={{position: 'fixed', height: '100%', width: '100%', top: 0, padding: '50vh 0 0 50vw', backgroundColor: '#0c0c0ca8'}}>
            <CircularProgress disableShrink/>
          </div>
        )}
      <Footer /> 
    </Container>
  );
}

export default App;
