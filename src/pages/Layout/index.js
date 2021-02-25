import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import '../../App.css';

import { ArrowRightAlt } from '@material-ui/icons'
import { Modal } from 'react-bootstrap';

// import Button, { Link } from 'components/Button'
import ModalDados from 'components/ModalConfirm'
import ModalContact from 'components/ModalContact'

import { Fields, Step3 } from '../Form/inputs'

import Who from '../Who'

import Load from 'components/Load'

import { check, attrFields, remove } from './actions';


import { Container, Body, Steps, ListFields, TitleForm } from './styles'

function Index() {
  const dispatch = useDispatch()
  const store = useSelector(state => state)
  
  const [ step, setStep ] = useState(0)
  const [ qtdSteps, setQtdSteps ] = useState(0)

  const [ loading, setLoading ] = useState(false)

  const [ showSucess, setShowSucess ] = useState(false)
  const [ show, setShow ] = useState()
  const [ confirmedData, setConfirmerdData ] = useState(false)
  
  const [ linkContact, setLinkContact ]  = useState(false)
  const [ resp, setResp ] = useState('')
  const [ modalConfirm, setModalConfirm ] = useState(false)
  
  const [ pathname ] = useState(window.location.pathname)

  
  const handleClose = () => {
    setShow(false)
  };
  const showContact = () => {
    setLinkContact(true)
    setShow(false)
  }

 
  function getValue(value) {
    dispatch(value)
  }

  const papel = [
    { typePerson: 'artist',
      steps: [
        {
          title: "Dados do músico",
          inputs: [
            { 
              ...attrFields.nomeCompleto,
              required: false,
              value: store.data, 
              dispatch: getValue 
            },
            { 
              ...attrFields.email,
              required: false,
              value: store.data, 
              dispatch: getValue 
            },
            { 
              ...attrFields.telefone,
              value: store.data, 
              dispatch: getValue 
            },
            {
              id: 'newsletter',
              required: false,
              value: store,
              dispatch: getValue
            },
            { 
              id: 'button', 
              value:"Próxima", 
              placeholder: "Próxima", 
              submit: submit
            }
          ]
        },
        {
          title:"Dados artísticos",
          inputs: [
            { 
              ...attrFields.nomeArtistico,
              value: store, 
              dispatch: getValue
            },
            { 
              ...attrFields.associacao, 
              value: store.data, 
              dispatch: getValue 
            },
            { 
              id: 'button', 
              value:"Próxima", 
              placeholder: "Próxima", 
              submit: submit
            }
          ]
        },
        {
          title: "Dados complementares",
          inputs: [
            { 
              ...attrFields.cpf, 
              value: store.data, 
              dispatch: getValue 
            },
            { 
              ...attrFields.musicas, 
              value: store, 
              dispatch: getValue 
            },
            {
              id: 'termos',
              name: 'termos',
              value: store,
              dispatch: getValue
            },
            { 
              id: 'button', 
              value:"Próxima", 
              placeholder: "Próxima", 
              submit: submit
            }
          ]
        }
      ]
    },
    {
      typePerson: 'producer',
      steps: [
        {
          title:"Dados do solicitante",
          inputs: [
            { 
              ...attrFields.nomeCompleto,
              name: 'nome_produtor', 
              value: store.data,  
              dispatch: getValue 
            },
            { 
              ...attrFields.email,
              value: store.data, 
              dispatch: getValue 
            },
            { 
              ...attrFields.telefone,
              value: store.data,  
              dispatch: getValue 
            },
            {
              id: 'newsletter',
              required: false,
              value: store,
              dispatch: getValue
            },

            { 
              id: 'button', 
              value:"Próxima", 
              placeholder: "Próxima", 
              submit: submit
            }
          ]
        },
        {
          title: "Dados do Artista",
          inputs: [
            { 
              ...attrFields.nome,
              value: store.data, 
              dispatch: getValue
            },
            { 
              ...attrFields.nomeArtistico,
              value: store, 
              dispatch: getValue
            },
            { 
              ...attrFields.associacao,
              value: store.data, 
              dispatch: getValue 
            },
            { 
              id: 'button', 
              value:"Próxima", 
              placeholder: "Próxima", 
              submit: submit
            }
          ]
        },
        {
          title: "Dados complementares",
          inputs: [
            { 
              ...attrFields.cpf,
              value: store.data, 
              dispatch: getValue 
            },            
            { 
              ...attrFields.musicas,
              value: store, 
              dispatch: getValue 
            },
            {
              id: 'termos',
              name: 'termos',
              value: store,
              dispatch: getValue
            },
            { 
              id: 'button', 
              value:"Próxima", 
              placeholder: "Próxima", 
              submit: submit
            }
          ]
        },
      ]
    }
  ]

  function backStep(value) {
    console.log(value)
    setModalConfirm(false)
    setStep(step-1)
  }

  useEffect(() => {
    settings()
      async function settings() {
        await dispatch({type: 'SET_PATHNAME', payload: window.location.pathname })
      }

      if (store.data.who !== '') {
        let lengthSteps = papel.find(type => type.typePerson === store.data.who).steps.length
        setQtdSteps(lengthSteps)
      }

  },[store.data.who]) //eslint-disable-line

  async function submit(e){
    e.preventDefault();
    const { data, state_form } = store
    
    let payload = data

    payload.nome_artistico = check.check(payload.nome_artistico, state_form.nome_artistico) 
    payload.redes_sociais = check.check(payload.redes_sociais, state_form.redes_sociais) 
    payload.lista_musicas = check.check(payload.lista_musicas, state_form.lista_musicas) 

    let nextStep = step + 1
    
    setLoading(true)
    setModalConfirm(nextStep > 2)

    setStep(nextStep)
    setLoading(false)

      // setShowSucess(true)
      if (confirmedData) {
        console.log('sucesso')
        
        // try {
        //   axios.post('https://lamusic-platform-backend.herokuapp.com/credito-retido',{
        //     ...payload
        //   })
        //   .then( res => {
        //       res.data.msg === 'ok' && setStep(step + 1);
        //       setLoading(false);
        //     }
        //   )
        //   .catch(function(err){
        //     if(err.response.status === 500 || err.response.status === 400 ){
        //       setResp(`${err.response.data.message} `)
        //       setShow(true)
        //       setLoading(false);
        //     }
        //   })
        // } catch(error) {
        //   console.error(error.response)
        //     setLoading(false);
        // }

      } 
  }

  return (
    <Container className="App">

      {!store.form && pathname !== '/artista' ?
          <Who {...store} />
        :(
          <>
            <Steps className="order-1 order-lg-2" active={store.form}>
              <span onClick={() => step > 0 && setStep(0)} className={`num-Steps ${step === 0 ? 'active' : ''}`}>1</span>
              <span onClick={() => step > 1 && setStep(1)} className={`num-Steps ${step === 1 ? 'active' : ''}`}>2</span>
              <span onClick={() => step >= 2 && setStep(2)} className={`num-Steps ${step === 2 ? 'active' : ''}`}>3</span>
            </Steps>
      
            <ListFields onSubmit={submit}>
              
              { papel
                .filter( form => form.typePerson === store.data.who)
                .map( ({steps}) =>
                  <>
                    {steps[step] && 
                      <TitleForm>{steps[step].title}</TitleForm> 
                    }
                    
                    {steps[step] && steps[step].inputs.map(input => 
                      Fields[input.id](input)
                    )}
                  </>
                ) 
              }

            {showSucess && <Step3 show={showSucess} setShowSucess={() => setShowSucess(!showSucess)}/> }
            
            {modalConfirm && 
              <ModalDados 
                step={step}
                setStep={backStep}
                modalConfirm={modalConfirm} 
                submit={(e) => {
                  setConfirmerdData(true)
                  submit(e)
                } } 
              />
            }
            </ListFields>
          </>
        )
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {resp}
          <div>
            <span style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={showContact}>
              <b>Entrar em contato</b>
            </span>
          </div>
        </Modal.Body>
        
        <Modal.Footer className="d-flex justify-content-center">
          <button className="buttonModal" onClick={handleClose}>
            Fechar
          </button>
        </Modal.Footer>
      </Modal>

      <ModalContact 
        showContact={linkContact} 
        setShowContact={() => setLinkContact(!linkContact)} />

      {loading && <Load /> } 
      
    </Container>
  );
}

export default Index;
