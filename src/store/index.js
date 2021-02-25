import { createStore } from 'redux'

const INITIAL_STATE = {
  form: false,
  data: { 
    who: window.location.pathname === '/artista' ? 'artist' : '',
    papel: window.location.pathname === '/artista' ? 'artista' : '',
    nome: "", 
    nome_produtor: "",
    email: "", 
    cpf:"", 
    telefone: "", 
    nome_artistico: [], 
    associacao: "", 
    redes_sociais: [], 
    lista_musicas: [],
    requiredStep1: true,
    requiredStep2: true,
    termos: false,
    newsletter: false 
  },
  state_form : {
    nome_artistico: '',
    redes_sociais: '',
    lista_musicas: ''
  },
  settings: {
    pathname: ''
  }
};

function form(state = INITIAL_STATE, action){
  switch (action.type) {
    case 'ADD_FORM':{
      // console.log(action.payload)
      const { who } = state.data

      let requiredStep1 = who === 'artist' ? action.payload.email !== '' && action.payload.nome !== '' ? false : true : action.payload.email !== '' && action.payload.nome_produtor !== ''  ? false : true
      let requiredStep2 = (action.payload.termos && action.payload.nome !== '') ? false : true

      return { ...state, data:{...action.payload, requiredStep1, requiredStep2}}
    }
    case 'ADD_STATE_FORM': {
      
      return {...state, state_form:{...action.payload}}
    }
    case 'INIT_FORM':
      const { form } = action.payload
      return {...state, form}

    case 'TERMOS':
      let requiredStep2 = (action.payload.termos && action.payload.nome !== '') ? false : true
      return {...state, data:{...state.data, ...action.payload, requiredStep2}}
   
    case 'SET_PATHNAME': 
      return {...state, settings: {...state.settings, pathname: action.payload}}
   
    default:
      return state;
  }
}

const store = createStore(form);

export default store;