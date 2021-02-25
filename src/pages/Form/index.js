import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap'
import { Radio, RadioGroup, Checkbox, FormControl, InputAdornment, IconButton } from '@material-ui/core'
import { phoneMask, cpfMask } from '../../components/Mask'
import { useSelector, useDispatch } from 'react-redux'
import AddCircle from '../../assets/img/addCircle.svg'

import { FieldSet, Input, RadioInput, Label, TextStep3, TagLabel, InputButtom, CloseTag, Span, ModalFinally, LinkNavegate, ButtonNavigate } from './style'

export function Step (props) {
  const {data:form, settings:{pathname} } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    props.callStep(form)
  }, [form, props])

  return (
    <Form>
      <Form.Group>
        <Label className="">Endereço de e-mail:</Label>
          <Input  type="email"
                isInvalid={!/^[^\s@]+@[^\s.]+\.[\w.]+$/.test(form.email)} 
                value={form.email} 
                onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, email: e.target.value}})} 
                placeholder="exemplo@gmail.com" />
      </Form.Group>
      <Form.Group>
        <Form.Label className="">Seu nome completo:</Form.Label>
        {(form.who === 'artist' || pathname === '/artista') && (
          <Input type="text" value={form.nome} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, nome: e.target.value}})} placeholder="Fernando Santos da Cruz" />
        )}
        {form.who === 'producer' && pathname !== '/artista' && (
          <Input type="text" value={form.nome_produtor} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, nome_produtor: e.target.value}})} placeholder="Fernando Santos da Cruz" />
        )}
      </Form.Group>
      {(form.who === 'artist' || pathname === '/artista') && (
        <Form.Group>
          <Form.Label className="">CPF:</Form.Label>
          <Input type="text" value={form.cpf} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, cpf: cpfMask(e.target.value)}})} placeholder="999.999.999-99" />
          <Span>Facultativo, mas ajuda para evitar homônimo</Span>
        </Form.Group>)
      }
      <Form.Group>
        <Form.Label className="">Número de telefone:</Form.Label>
        <Input type="text" value={form.telefone} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, telefone: phoneMask(e.target.value)}})} placeholder="(00) 0 0000-0000" />
      </Form.Group>
    </Form>
  );
}

export function Step2 (props) {

  
  const [ associacao ] = useState(['ABRAMUS', 'UBC', 'SOCIMPRO', 'SICAM', 'AMAR', 'ASSIM', 'SBACEM', 'Não tenho certeza', 'Ainda não sou filiado'])

  const form = useSelector(state => state.data);
  const state_form = useSelector(state => state.state_form)
  const dispatch = useDispatch();

  useEffect(() => {
    props.callStep(form)
  }, [form, props])

  function removeMusic(e){
    let index = form.lista_musicas.indexOf(`${e}`);
        index !== -1 && form.lista_musicas.splice(index,1);
        dispatch({type: 'ADD_FORM', payload: {...form, lista_musicas: form.lista_musicas}})
  }
  
  function removeSociais(e){
    let index = form.redes_sociais.indexOf(`${e}`);
        index !== -1 && form.redes_sociais.splice(index,1);
        dispatch({type: 'ADD_FORM', payload: {...form, redes_sociais: form.redes_sociais}})
  }

  function removeArtista(e){
    let index = form.nome_artistico.indexOf(`${e}`);
        index !== -1 && form.nome_artistico.splice(index,1);
        dispatch({type: 'ADD_FORM', payload: {...form, nome_artistico: form.nome_artistico}})
  }

  return (
    <Form>
      {form.who === 'producer' && (
        <>
          <Form.Group>
            <Form.Label className="">Nome:</Form.Label>
            <Input type="text" value={form.nome} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, nome: e.target.value}})} placeholder="Nome do artista" />
          </Form.Group>

          <Form.Group>
            <Form.Label className="">CPF:</Form.Label>
            <Input type="text" value={form.cpf} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, cpf: cpfMask(e.target.value)}})} placeholder="999.999.999-99" />
            <Span>Facultativo, mas ajuda para evitar homônimo</Span>
          </Form.Group>
        </>
      )}
      <FieldSet className="w-100 mb-3" variant="filled">
        <Form.Label className="">Nome Artístico, Banda ou Coletivo:</Form.Label>
          <InputButtom
            value={state_form.nome_artistico}
            onChange={ e => dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, nome_artistico: e.target.value}})}
            placeholder="Nome da banda ou artista"
            id="filled-adornment-password"
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={ () => { 
                    state_form.nome_artistico && dispatch({type: 'ADD_FORM', payload: {...form, nome_artistico: [...form.nome_artistico, state_form.nome_artistico]}}) 
                    state_form.nome_artistico && dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, nome_artistico:''}})
                  }} 
                >
                  <img src={AddCircle} alt="add" />
                </IconButton>
              </InputAdornment>
            }
          />
          <div className="w-100 d-flex row mx-auto">
            {form.nome_artistico.map( (r, key) => (<TagLabel className="my-3 mr-3" key={key}>{r}<CloseTag onClick={e => removeArtista(r)} title="Remover">x</CloseTag></TagLabel>))}
          </div>
        </FieldSet>

        <FieldSet>
          <Form.Label className="">Já é filiado a alguma Associação do Ecad?</Form.Label>
          <select>
            {associacao.map((ass, index) => (
              <option value={ass} key={index}>{ass}</option>
            ))}
          </select>
          {/* <RadioGroup name="associado" value={form.associacao} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, associacao: e.target.value}})} >
            {associacao.map((ass, index) => (
              <RadioInput value={ass} key={index} control={<Radio color="default"/>} label={ass} />
            ))}
          </RadioGroup> */}
        </FieldSet>

      <FieldSet className="w-100 mb-3" variant="filled">
        <Form.Label className="">Redes sociais</Form.Label>
          <InputButtom
            value={state_form.redes_sociais}
            onChange={ e => dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, redes_sociais: e.target.value}})}
            placeholder="@exemplo123_"
            id="filled-adornment-password"
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={ () => {
                    state_form.redes_sociais && dispatch({type: 'ADD_FORM', payload: {...form, redes_sociais: [...form.redes_sociais, state_form.redes_sociais]}}) 
                    state_form.redes_sociais && dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, redes_sociais: ''}})
                  }} 
                >
                  <img src={AddCircle} alt="add" />
                </IconButton>
              </InputAdornment>
            }
          />
          <div className="w-100 d-flex row mx-auto">
            {form.redes_sociais.map( (r, key) => (<TagLabel className="my-3 mr-3" key={key}>{r}<CloseTag onClick={e => removeSociais(r)} title="Remover">x</CloseTag></TagLabel>))}
          </div>
      </FieldSet>

      <FieldSet className="w-100 mb-3" variant="filled">
        <Form.Label className="">Lista de Músicas</Form.Label>
        <Form.Text className=" mb-3">Inserir nome das músicas e links para identificação (youtube, spotify, deezer, etc) Ex.: "Nome da Música" - [inserir link do youtube]</Form.Text>
        <InputButtom
          value={state_form.lista_musicas}
          onChange={ e => dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, lista_musicas: e.target.value}})}
          placeholder="Nome da música"
          id="filled-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={ () => {
                  state_form.lista_musicas && dispatch({type: 'ADD_FORM', payload: {...form, lista_musicas: [...form.lista_musicas, state_form.lista_musicas]}}) 
                  state_form.lista_musicas && dispatch({type: 'ADD_STATE_FORM', payload: {...state_form, lista_musicas: ''}})
                }}
              >
                <img src={AddCircle} alt="add" />
              </IconButton>
            </InputAdornment>
          }
        />
        <div className="w-100 d-flex row mx-auto">
          {form.lista_musicas.map( (r, key) => (<TagLabel className="my-3 mr-3" key={key}>{r} <CloseTag onClick={e => removeMusic(r)} title="Remover">x</CloseTag></TagLabel>))}
        </div>
      </FieldSet>

      <RadioInput control={<Checkbox checked={form.newsletter} onChange={ e => dispatch({type: 'TERMOS', payload: {...form, newsletter: !form.newsletter}})} color="default" name="newsletter"/>} label={'Aceito receber novidades e contato da LA Music por e-mail'} />
      <RadioInput control={<Checkbox checked={form.termos} color="default" onChange={ e => dispatch({type: 'TERMOS', payload: {...form, termos: !form.termos}})} name="termos"/>} label={'Autorizo a consulta e estou ciente das condições para realização da busca de Créditos Retidos e confirmo que li e concordo com os Termos de Uso e Política de Privacidade.'} />
    </Form>
  );
}
export function Step3 () {
  const [ show, handleShow ] = useState(true)
  return (
    <>
      <TextStep3 className=" text-center my-5">Em até 48 horas você receberá um e-mail indicando se existem créditos retidos para receber.</TextStep3>
      <ModalFinally show={show} onHide={handleShow}>
        <Modal.Header className="pb-0" closeButton>
        </Modal.Header>
        <Modal.Body className="px-5 mb-3">
          <h3 className="mb-3">Relatório solicitado com sucesso!</h3>
          <p>Você acaba de solicitar a consulta de créditos retidos no Ecad.</p>
          <p><b>Entraremos em contato com a Associação para processar sua solicitação</b></p>
          <p>Em até 2 (dois) dias úteis você receberá um e-mail indicando se existem créditos retidos para receber.</p>
          
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
    </>
    );
}
