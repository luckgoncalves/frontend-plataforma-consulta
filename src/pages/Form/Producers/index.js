import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap'
import { Radio, RadioGroup, Checkbox, FormControl, InputAdornment, IconButton } from '@material-ui/core'
import { phoneMask, cpfMask } from 'components/Mask'
import { useSelector, useDispatch } from 'react-redux'
import AddCircle from 'assets/img/addCircle.svg'
import { Input, RadioInput, Label, TextStep3, TagLabel, InputButtom, CloseTag, Span, ModalFinally, LinkNavegate, ButtonNavigate } from '../style'

export function Step (props) {
  const {data:form, settings:{pathname} } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    props.callStep(form)
  }, [form, props])

  return (
    <Form>
      <Form.Group>
        <Label className="text-white">Endereço de e-mail:</Label>
          <Input  type="email"
                isInvalid={!/^[^\s@]+@[^\s.]+\.[\w.]+$/.test(form.email)} 
                value={form.email} 
                onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, email: e.target.value}})} 
                placeholder="exemplo@gmail.com" />
      </Form.Group>
      <Form.Group>
        <Form.Label className="text-white">Seu nome completo:</Form.Label>
        {(form.who === 'artist' || pathname === '/artista') && (
          <Input type="text" value={form.nome} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, nome: e.target.value}})} placeholder="Fernando Santos da Cruz" />
        )}
        {form.who === 'producer' && pathname !== '/artista' && (
          <Input type="text" value={form.nome_produtor} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, nome_produtor: e.target.value}})} placeholder="Fernando Santos da Cruz" />
        )}
      </Form.Group>
      {(form.who === 'artist' || pathname === '/artista') && (
        <Form.Group>
          <Form.Label className="text-white">CPF:</Form.Label>
          <Input type="text" value={form.cpf} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, cpf: cpfMask(e.target.value)}})} placeholder="999.999.999-99" />
          <Span>Facultativo, mas ajuda para evitar homônimo</Span>
        </Form.Group>)
      }
      <Form.Group>
        <Form.Label className="text-white">Número de telefone:</Form.Label>
        <Input type="text" value={form.telefone} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, telefone: phoneMask(e.target.value)}})} placeholder="(00) 0 0000-0000" />
      </Form.Group>
    </Form>
  );
}

export function Step2 (props) {
  const [ sociais, setSociais ] = useState()
  const [ musicas, setMusicas ] = useState()
  const [ associacao ] = useState(['ABRAMUS', 'UBC', 'SOCIMPRO', 'SICAM', 'AMAR', 'ASSIM', 'SBACEM', 'Não tenho certeza', 'Ainda não sou filiado'])

  const form = useSelector(state => state.data);
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

  return (
    <Form>
      {form.who === 'producer' && (
        <>
          <Form.Group>
            <Form.Label className="text-white">Nome:</Form.Label>
            <Input type="text" value={form.nome} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, nome: e.target.value}})} placeholder="Nome do artista" />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-white">CPF:</Form.Label>
            <Input type="text" value={form.cpf} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, cpf: cpfMask(e.target.value)}})} placeholder="999.999.999-99" />
            <Span>Facultativo, mas ajuda para evitar homônimo</Span>
          </Form.Group>
        </>
      )}
      <Form.Group>
        <Form.Label className="text-white">Nome Artístico, Banda ou Coletivo:</Form.Label>
        <Input type="text" value={form.nome_artistico} onChange={e => dispatch({type: 'ADD_FORM', payload: { ...form, nome_artistico: e.target.value }})} placeholder="Nome da banda ou artista" />
      </Form.Group>
      <Form.Group>
        <Form.Label className="text-white">É vinculado a alguma associação do ECAD(Abramus, UBC, etc)?</Form.Label>
        <RadioGroup name="associado" value={form.associacao} onChange={e => dispatch({type: 'ADD_FORM', payload: {...form, associacao: e.target.value}})} >
          {associacao.map((ass, index) => (
            <RadioInput value={ass} key={index} control={<Radio color="default"/>} label={ass} />
          ))}
        </RadioGroup>
      </Form.Group>
      <FormControl className="w-100 mb-3" variant="filled">
        <Form.Label className="text-white">Redes sociais</Form.Label>
          <InputButtom
            value={sociais}
            onChange={e => setSociais(e.target.value)}
            placeholder="@exemplo123_"
            id="filled-adornment-password"
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={ () => dispatch({type: 'ADD_FORM', payload: {...form, redes_sociais: [...form.redes_sociais, sociais]}}) } 
                >
                  <img src={AddCircle} alt="add" />
                </IconButton>
              </InputAdornment>
            }
          />
          <div className="w-100 d-flex row mx-auto">
            {form.redes_sociais.map( (r, key) => (<TagLabel className="my-3 mr-3" key={key}>{r}<CloseTag onClick={e => removeSociais(r)} title="Remover">x</CloseTag></TagLabel>))}
          </div>
        </FormControl>
      <FormControl className="w-100 mb-3" variant="filled">
        <Form.Label className="text-white">Lista de Músicas</Form.Label>
        <Form.Text className="text-white mb-3">Inserir nome das músicas e links para identificação (youtube, spotify, deezer, etc) Ex.: "Nome da Música" - [inserir link do youtube]</Form.Text>
        <InputButtom
          value={musicas}
          onChange={ async e => setMusicas(e.target.value)}
          placeholder="Nome da música"
          id="filled-adornment-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                onClick={ () => dispatch({type: 'ADD_FORM', payload: {...form, lista_musicas: [...form.lista_musicas, musicas]}}) }
              >
                <img src={AddCircle} alt="add" />
              </IconButton>
            </InputAdornment>
          }
        />
        <div className="w-100 d-flex row mx-auto">
          {form.lista_musicas.map( (r, key) => (<TagLabel className="my-3 mr-3" key={key}>{r} <CloseTag onClick={e => removeMusic(r)} title="Remover">x</CloseTag></TagLabel>))}
        </div>
      </FormControl>
      <RadioInput control={<Checkbox checked={form.newsletter} onChange={ e => dispatch({type: 'TERMOS', payload: {...form, newsletter: !form.newsletter}})} color="default" name="newsletter"/>} label={'Aceito receber novidades e contato da LA Music por e-mail'} />
      <RadioInput control={<Checkbox checked={form.termos} color="default" onChange={ e => dispatch({type: 'TERMOS', payload: {...form, termos: !form.termos}})} name="termos"/>} label={'Autorizo a consulta e estou ciente das condições para realização da busca de Créditos Retidos e confirmo que li e concordo com os Termos de Uso e Política de Privacidade.'} />
    </Form>
  );
}
export function Step3 () {
  const [ show, handleShow ] = useState(true)
  return (
    <>
      <TextStep3 className="text-white text-center my-5">Em até 48 horas você receberá um e-mail indicando se existem créditos retidos para receber.</TextStep3>
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
