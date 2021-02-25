import React from 'react';
import Button from 'components/Button'
import { useSelector } from 'react-redux'

import { Container, Box } from './styles'

const Index = ({step, setStep, setModalConfirm, submit}) => {

  const state = useSelector(state => state);


  return (
    
      <Container>
        <div className="header">
          <h5>Confirme os dados preenchidos</h5>
        </div>

        <div className="content">
          <Box>
              <div>
                  <h5>Endereço de e-mail</h5>
                  <p>{state.data.email}</p>
              </div>
              <div>
                  <h5>Seu nome completo:</h5>
                  <p>{state.data.who === 'producer' ? state.data.nome_produtor : state.data.nome}</p>
              </div>
              <div>
                  <h5>CPF:</h5>
                  <p>{state.data.cpf}</p>
              </div>
              <div>
                  <h5>Número de telefone:</h5>
                  <p>{state.data.telefone}</p>
              </div>
          </Box>
          <Box>
              {state.data.who === 'producer' && 
                <div>
                    <h5>Seu nome completo:</h5>
                    <p>{state.data.nome }</p>
                </div>
              }
              <div>
                  <h5>Nome Artistico, Banda ou Coletivo:</h5>
                  <p>{`${state.data.nome_artistico.join(', ')}`}, {state.state_form.nome_artistico}</p>
              </div>
              <div>
                  <h5>É vinculado a alguma associação do ECAD(Abramus, UBC, etc)?</h5>
                  <p>{state.data.associacao}</p>
              </div>
              <div>
                  <h5>Lista de Músicas</h5>
                  <p>{state.data.lista_musicas.join(', ')}, { state.state_form.lista_musicas}</p>
              </div>
          </Box>
        </div>
        <div className="footer">
          <Button 
            className="cancel" 
            onClick={() => setStep(step-1)}
            colorbutton={`var(--gray-4)`}
            text="Cancelar" />{' '}

          <Button 
            className="submit" 
            onClick={submit}
            colorbutton={`var(--green)`}
            text="Finalizar"/>
        </div>
      </Container>
  );
}

export default Index;