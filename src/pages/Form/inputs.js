import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap'
import { Radio, RadioGroup, Checkbox, FormControl, InputAdornment, IconButton } from '@material-ui/core'
import { phoneMask, cpfMask } from '../../components/Mask'
import Button from 'components/Button'
import { useSelector, useDispatch } from 'react-redux'
import { remove } from 'pages/Layout/actions'
import AddCircle from '../../assets/img/addCircle.svg'

import { FieldSet, Input, RadioInput, Label, TextStep3, TagLabel, InputButtom, CloseTag, Span, ModalFinally, LinkNavegate, ButtonNavigate } from './style'


export const Fields = {
  
  email: function ({name, required, value, placeholder, dispatch}) {
    const form = value

    return (
      <Form.Group>
        <Label className="">Endereço de e-mail:</Label>
          <Input 
            required={required}
            type="email"
            name={name}
            isInvalid={!/^[^\s@]+@[^\s.]+\.[\w.]+$/.test(form[name])}
            value={form[name]} 
            onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, [name]: e.target.value}})} 
            placeholder={placeholder} />
      </Form.Group>
    )
  },
 

  nomeCompleto: function({name, required, value, placeholder, dispatch}) {
    const form = value

    return (
      <Form.Group>
        <Form.Label className="">Seu nome completo:</Form.Label>
          <Input 
            required={required}
            type="text" 
            name={name}
            value={form[name]} 
            onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, [name]: e.target.value}})} 
            placeholder={placeholder} />
      </Form.Group>
    )
  },


  cpf: function({name, required, value, placeholder, dispatch}) {
    const form = value
    
    return (
      <Form.Group>
        <Form.Label className="">CPF:</Form.Label>
        <Input
          required={required} 
          type="text" 
          name={name}
          value={form[name]} 
          onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, [name]: cpfMask(e.target.value)}})} 
          placeholder={placeholder} />
        <Span>Facultativo, mas ajuda para evitar homônimo</Span>
      </Form.Group>
    )
  },

  telefone: function ({name, required, value, placeholder, dispatch}) {
    const form = value

    return (
      <Form.Group>
        <Form.Label className="">Número de telefone:</Form.Label>
        <Input 
          required={required}
          type="text" 
          name={name}
          value={form[name]} 
          onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, [name]: phoneMask(e.target.value)}})} 
          placeholder={placeholder} />
      </Form.Group>
    )
  },

  nome: function({name, required, value, placeholder, dispatch}) {
    const form = value

    return (
      <Form.Group>
        <Form.Label className="">Nome:</Form.Label>
        <Input
          required={required} 
          type="text" 
          name={name}
          value={form[name]} 
          onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, [name]: e.target.value}})} 
          placeholder={placeholder} />
      </Form.Group>
    )
  },

  nomeArtistico: function ({name, required, value, placeholder, dispatch}) {
    const {state_form, data } = value

    return (
      <Form.Group className="w-100 mb-3" variant="filled">
        <Form.Label className="">Nome Artístico, Banda ou Coletivo:</Form.Label>
       
        <InputButtom
          value={state_form[name]}
          onChange={ e => dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, [name]: e.target.value}})}
          placeholder={placeholder}
          className="w-100"
          endAdornment={
          <InputAdornment position="end" >
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={ () => { 
                state_form[name] && dispatch({type: 'ADD_FORM', payload: {...data, [name]: [...data[name], state_form[name]]}}) 
                state_form[name] && dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, [name]:''}})
              }} 
            >
              <img src={AddCircle} alt="add" />
            </IconButton>
          </InputAdornment>
          }
        />
        <div className="w-100 d-flex row mx-auto">
          {data[name].map( (r, key) => 
            <TagLabel className="my-3 mr-3" key={key}>
              {r}<CloseTag 
                  onClick={e => remove.artista(r, data, dispatch)}
                  title="Remover">x</CloseTag>
            </TagLabel>
          )}
        </div>
      </Form.Group>
    )
  },

  associacao: function({name, value, placeholder, dispatch}) {
    return (
      <Form.Group>
        <FieldSet>
          <Form.Label className="">Já é filiado a alguma Associação do Ecad?</Form.Label>
          <select>
            {['ABRAMUS', 'UBC', 'SOCIMPRO', 'SICAM', 'AMAR', 'ASSIM', 'SBACEM', 'Não tenho certeza', 'Ainda não sou filiado']
            .map((ass) => (
              <option value={ass} key={ass}>{ass}</option>
            ))}
          </select>
        </FieldSet>
      </Form.Group>
    )
  },

  redeSocial: function({name, value, placeholder, dispatch}) {
    const {state_form, data } = value
    
    return (
      <Form.Group>
        <FieldSet className="w-100 mb-3" variant="filled">
          <Form.Label className="">Redes sociais</Form.Label>
            <InputButtom
              name={name}
              value={state_form[name]}
              onChange={ e => dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, [name]: e.target.value}})}
              placeholder={placeholder}
              endAdornment={
                <InputAdornment position="end" >
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={ () => {
                      state_form[name] && dispatch({type: 'ADD_FORM', payload: {...data, [name]: [...data[name], state_form[name]]}}) 
                      state_form[name] && dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, [name]: ''}})
                    }} 
                  >
                    <img src={AddCircle} alt="add" />
                  </IconButton>
                </InputAdornment>
              }
            />
            <div className="w-100 d-flex row mx-auto">
              {data[name].map( (r, key) => 
                <TagLabel className="my-3 mr-3" key={key}>
                  {r}<CloseTag 
                      onClick={e => remove.sociais(r, data, dispatch)} 
                      title="Remover">x</CloseTag>
                </TagLabel>
              )}
            </div>
        </FieldSet>
      </Form.Group>
    )
  },

  musicas: function({name, value, placeholder, dispatch}) {
    const { state_form, data} = value

    return (
      <Form.Group>
        <FieldSet className="w-100 mb-3" variant="filled">
          <Form.Label className="">Lista de Músicas</Form.Label>
          <Form.Text className=" mb-3">Inserir nome das músicas e links para identificação (youtube, spotify, deezer, etc) Ex.: "Nome da Música" - [inserir link do youtube]</Form.Text>
          <InputButtom
            name={name}
            value={state_form[name]}
            onChange={ e => dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, [name]: e.target.value}})}
            placeholder={placeholder}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={ () => {
                    state_form[name] && dispatch({type: 'ADD_FORM', payload: {...data, [name]: [...data[name], state_form[name]]}}) 
                    state_form[name] && dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, [name]: ''}})
                  }}
                >
                  <img src={AddCircle} alt="add" />
                </IconButton>
              </InputAdornment>
            }
          />
          <div className="w-100 d-flex row mx-auto">
            {data[name].map( (r, key) => 
              <TagLabel className="my-3 mr-3" key={key}>
                {r} <CloseTag 
                      onClick={e => remove.music(r, data, dispatch)} 
                      title="Remover">x</CloseTag>
              </TagLabel>
            )}
          </div>
        </FieldSet>
      </Form.Group>
    )
  },

  button: function ({value, submit}) {
    
    return (
      <Button 
        className="w-100"
        type="submit"
        // onClick={() => submit()} 
        colorbutton={`var(--green)`} 
        text={value} />
    )
  },

  newsletter: function ({ value, dispatch }) {
    const { data } = value

    return (
      <RadioInput 
        control={ <Checkbox 
            checked={data.newsletter} 
            onChange={ e => dispatch({type: 'ADD_FORM', payload: {...data, newsletter: !data.newsletter}})} 
            color="default" 
            name="newsletter"/>} 
        label={'Aceito receber novidades e contato da LA Music por e-mail'} />
    )
  }, 

  termos: function ({value, dispatch}) {
    const { data } = value

    return (
      <RadioInput 
        control={ <Checkbox 
            checked={data.termos} 
            color="default" 
            onChange={ e => dispatch({type: 'TERMOS', payload: {...data, termos: !data.termos}})} 
            name="termos"/>} 
        label={'Autorizo a consulta e estou ciente das condições para realização da busca de Créditos Retidos e confirmo que li e concordo com os Termos de Uso e Política de Privacidade.'} />
    )
  }
}


export function Step3 ({show, setShowSucess}) {

  return (
    <ModalFinally show={show} onHide={setShowSucess}>
      <Modal.Header className="pb-0" closeButton>
      </Modal.Header>
      <Modal.Body className="px-5 mb-3">
        <h3 className="mb-3">Relatório solicitado com sucesso!</h3>
        <p>Você acaba de solicitar a consulta de Créditos Retidos junto ao ECAD. 
          Estamos processando sua solicitação.</p>
        <p><b>Em até 2 (dois) dias úteis você receberá um e-mail indicando se existem créditos retidos para receber.</b></p>
        <p>Estou ciente das condições para realização da busca e confirmo que li e concordo com as disposições dos <a href="https://www.lamusic.com.br/termos-de-uso" target="_blank">Termos de Uso</a> e <a href="https://www.lamusic.com.br/politica-de-privacidade" target="_blank">Políticas de Privacidade</a></p>
        
        <div className="row d-flex justify-content-center flex-column px-5">
          <ButtonNavigate href="https://consulta.lamusic.com.br/" className="mt-3">Fazer nova pesquisa</ButtonNavigate>
        
          <div className="mt-3 d-flex justify-content-between flex-column flex-sm-row">
            <LinkNavegate type="backSite" href="https://www.lamusic.com.br/">
              Voltar para o site
            </LinkNavegate>
        
            <LinkNavegate type="termos" href="https://www.lamusic.com.br/termos-de-uso/" target="_blank">
              Ver termos de uso
            </LinkNavegate>
          </div>
        </div>
      </Modal.Body>
    </ModalFinally>
  );
}
