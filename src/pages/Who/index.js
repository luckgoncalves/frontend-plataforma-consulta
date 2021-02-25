import React from 'react';
import { CardHeader, CardFooter, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { AiFillStar } from 'react-icons/ai'
import SongBlack from '../../assets/img/songBlack.svg'
import Vinyls from '../../assets/img/vinyls.svg'
import EconomicBlack from '../../assets/img/economicBlack.svg'
import { useDispatch, useSelector } from 'react-redux';
import { Cards, CardWho, Title, Value, Next, Container, Budget } from './styles';

function Who(props) {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state);

  const handlePapel = (who, papel) => dispatch({type: 'ADD_FORM', payload: {...data, who, papel}})

  const next = async (who, papel) => {
    await handlePapel(who, papel)
    dispatch({type: 'INIT_FORM', payload: {form: true}})
  }

  return (
    <Container>
      <Cards>
        <CardWho>
          <Title>Quem você é ?</Title>
          <div>
            <Budget style={{opacity:0}}>
              <div className="mx-3">
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
              </div>
              LA Pro</Budget>
            <CardHeader className="justify-content-center align-items-center d-flex" style={{height: '91px', backgroundColor: '#fff'}}>
              <CardTitle className="m-0 d-flex align-items-center justify-content-center"><img src={SongBlack} alt="Song" className="mr-4 img-fluid" /> Músicos e Compositores </CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle className="mb-3">Vantagens</CardSubtitle>
              <ul className="ul-green" style={{height: '100%', paddingLeft: '1.5rem'}}>
                <li className="my-2">Solicitação gratuita</li>
                <li className="my-2">1 Solicitação</li>
                <li className="my-2">Retorno em até 48 horas</li>
              </ul>
            </CardBody>
            <CardFooter className="justify-content-center align-items-center d-flex p-0">
              <Value color="#0FBB00">Gratuito</Value>
            </CardFooter>
            <Next bg="#0FBB00" variant="contained" onClick={() => next('artist', 'artista')} className="d-block w-100 py-3 text-capitalize">Próxima</Next>
          </div>
        </CardWho>
       
        <CardWho>
          <div>
            <Budget style={{opacity:0}}>
              <div className="mx-3"><AiFillStar/><AiFillStar/><AiFillStar/></div>
              LA Pro</Budget>
            <CardHeader className="justify-content-center align-items-center d-flex" style={{height: '91px', backgroundColor: '#fff'}}>
              <CardTitle className="m-0 d-flex align-items-center justify-content-center"><img src={EconomicBlack} alt="producer" className="mr-3 img-fluid" /> Produtores e Empresários</CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle className="mb-3">Vantagens</CardSubtitle>
              <ul className="ul-green" style={{height: '100%', paddingLeft: '1.5rem'}}>
                <li className="my-2">Solicitação gratuita</li>
                <li className="my-2">Consulta p/ até 5 artistas</li>
                <li className="my-2">Retorno em até 48 horas</li>
              </ul>
            </CardBody>
            <CardFooter className="justify-content-center align-items-center d-flex p-0">
              <Value color="#0FBB00">Gratuito</Value>
            </CardFooter>
            <Next bg="#0FBB00" variant="contained" onClick={() => next('producer', 'produtor')} className="d-block w-100 py-3 text-capitalize">Próxima</Next>
            </div>
        </CardWho>
        
        <CardWho>
          <div>
            <Budget>
              <div className="mx-3"><AiFillStar/><AiFillStar/><AiFillStar/></div>
              LA Pro</Budget>
            <CardHeader className="justify-content-center align-items-center d-flex" style={{height: '91px', backgroundColor: '#fff'}}>
              <CardTitle className="m-0 d-flex align-items-center justify-content-center"><img src={data.who === 'artist' ? Vinyls : Vinyls} alt="Song" className="mr-4 img-fluid" /> para Editoras </CardTitle>
            </CardHeader>
            <CardBody>
              <CardSubtitle className="mb-3">Vantagens</CardSubtitle>
              <ul className="ul-orange" style={{height: '100%', paddingLeft: '1.5rem'}}>
                <li className="my-2">Consulte e gerencie os créditos retidos de todos os seus artistas</li>
                <li className="my-2">Coleta de fonomecânico sem burocracia</li>
                <li className="my-2">Consultoria em direito autoral </li>
                <li className="my-2">Taxa de administração para liberação de retidos negociável </li>
              </ul>
            </CardBody>
            <CardFooter className="justify-content-center align-items-center d-flex p-0">
              <Value color="#FFC107">Grátis</Value>
            </CardFooter>
            <Next variant="contained" bg="#FFC107" onClick={() => window.open('https://app.lamusic.com.br/pro')} className="d-block w-100 py-3 text-capitalize">Próxima</Next>
          </div>
        </CardWho>
      </Cards>
   </Container >
    );
}

export default Who;