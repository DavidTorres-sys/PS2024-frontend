import React from 'react'

const Footer = () => {
  return (
    <footer className='flexStart footer'>
      <div className='flex flex-col gap-12 w-full'>
        <div className='flex items-start flex-col'>
          <img
            alt="RedVialMed"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            className="h-8 w-auto"
          />
          <p className='text-start text-sm font-normal mt-5 max-w-xs'>
            Sistema de Administración de la Malla Vial - Medellín
            Este sistema permite visualizar y gestionar la información de los segmentos viales, 
            incluyendo sus calzadas, bordillos y demás elementos asociados. 
            Cada segmento es único y contiene información específica como su longitud,
            número identificador y nomenclatura de dirección.
          </p>
        </div>
        <div className='flex flex-wrap gap-12'></div>
      </div>
    </footer>
  )
}

export default Footer