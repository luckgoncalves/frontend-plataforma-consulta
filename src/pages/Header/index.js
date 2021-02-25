import React, { useState } from 'react'

import Logo from 'assets/img/logo.svg'
import Hamburguer from 'assets/img/hamburguer.svg'
import CloseMenu from 'assets/img/closeMenu.svg'

import { Header, NavBar, MenuMobile } from './style';

function Index(props) {

  const [ toggle, setToggle ] = useState(false);

  const listMenu = [
    { label: 'Inicial'   , url: 'https://www.lamusic.com.br' },
    { label: 'Quem somos', url: 'https://www.lamusic.com.br/quem-somos/' },
    { label: 'Soluções'  , url: '#' , 
      submenu: [
        {label: 'Liberação de Créditos Retidos', url: 'https://www.lamusic.com.br/creditos-retidos/'},
        {label: 'Registro de Marcas Artísticas', url: 'https://www.lamusic.com.br/registro-de-marca/'},
        {label: 'Contratos e Consultoria Jurídica', url: 'https://www.lamusic.com.br/contratos-e-consultoria/'},
        {label: 'Cadastro de Músicas no ECAD', url: 'https://www.lamusic.com.br/direitos-autorais/'},
    ]},
    { label: 'Clientes', url: 'https://www.lamusic.com.br/clientes/' },
    { label: 'Blog', url: 'https://www.lamusic.com.br/blog/' }
  ] 

  return (
    <>
      <NavBar >
        <img src={Logo} className="logo" alt="LA Music" />
        <ul>
          {listMenu.map( list => 
            <li style={{position: 'relative'}}>
              <a href={list.url}>{list.label}</a>

              {list.submenu && (
                <ul className="flex-column m-0 p-0">
                  {list.submenu.map( ls => 
                    <li className="m-0 p-0">
                      <a href={ls.url}>{ls.label}</a>
                    </li>
                  )}
                </ul>
              )}
            </li>
          )}
        </ul>

        { !toggle && <img src={Hamburguer} onClick={() => setToggle(!toggle)} className="menu" alt="menu"/> }
        { toggle && <img src={CloseMenu} onClick={() => setToggle(!toggle)} className="menu" alt="menu"/> }
      </NavBar>

      <MenuMobile toggle={toggle}>
        {listMenu.map( list => 
          <li style={{position: 'relative'}}>
            <a href={list.url}>{list.label}</a>

            {list.submenu && (
              <ul className="flex-column m-0 p-0">
                {list.submenu.map( ls => 
                  <li className="m-0 p-0">
                    <a href={ls.url}>{ls.label}</a>
                  </li>
                )}
              </ul>
            )}
          </li>
        )}
      </MenuMobile>

      <Header className='pb-5'>
        <div>
          <h1 className="mb-3">Consulta de Créditos Retidos</h1>
          <p>Formulário para identificação do artista e de seu catálogo, verificação de sua situação perante o ECAD e pesquisa de créditos retidos</p>
        </div>
      </Header>
    </>
  )
}

export default Index

