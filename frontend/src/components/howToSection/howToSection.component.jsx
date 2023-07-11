import React from 'react'
import { Tabs,List,Card,Image,Typography } from 'antd';
import "./howToSection.styles.scss"


const { TabPane } = Tabs;
const {Title,Paragraph}=Typography

const HowToSection=({title,tabNames})=>{
    const dataPriori = [
        {
          title: 'Formato correcto',
          imageSrc:"/good_ones/correct.png",
          preview:{
            src: '/good_ones/1.png',
          }
        },
        {
          title: 'Formato incorrecto',
          imageSrc:'/bad_ones/incorrect.png',
          preview:{
            src:"/bad_ones/1.png" ,
          }
        },
      ];
      const dataMetricas = [
        {
          title: 'Formato correcto',
          imageSrc:'/good_ones/correct.png',
          preview:{
            src: "/good_ones/2.png",
          }
        },
        {
          title: 'Formato incorrecto ',
          imageSrc:'/bad_ones/incorrect.png',
          preview:{
            src:"/bad_ones/2.png" ,
          }
        },
      ];
      const dataClustering = [
        {
          title: 'Formato correcto',
          imageSrc:'/good_ones/correct.png',
          preview:{
            src: "/good_ones/3.png",
          }
        },
        {
          title: 'Formato incorrecto ',
          imageSrc:'/bad_ones/incorrect.png',
          preview:{
            src: "/bad_ones/3.png",
          }
        },
      ];
    return(
        <div id="howToDiv">
        <Title level={3}>{title}</Title>
            <Tabs defaultActiveKey="1" >
                <TabPane tab={tabNames[0]} key="1">
                <Paragraph>
                Para usar este algoritmo sube un archivo y parámetros(lift, confianza,etc) tomando en cuenta que tiene que cumplir con las siguientes características para obtener los mejores resultados posibles. 
                    <ul>
                        <li>Subirlo de preferencia en formato CSV(solo se pueden subir archivos CSV o TXT)</li>
                        <li>Solo subirlo con los campos necesarios para el algoritmo</li>
                        <li>Respetar el formato establecido en la siguiente sección</li>
                        <li>Usa parámetros de acuerdo a la data que estas subiendo en el archivo</li>
                    </ul>
                    <Title level={3}>Formato</Title>
                </Paragraph>
                <List
                    grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 4,
                    md: 2,
                    lg: 4,
                    xl: 4,
                    xxl: 8,
                    }}
                    dataSource={dataPriori}
                    renderItem={item => (
                    <List.Item>
                        <Card title={item.title} style={{ width: 240 }}><Image width={200} height={200} src={item.imageSrc} preview={item.preview}/></Card>
                    </List.Item>
                    )}
                />
                </TabPane>
                <TabPane tab={tabNames[1]} key="2">
                <Paragraph>
                Para usar este algoritmo sube un archivo tomando en cuenta que tiene que cumplir con las siguientes características para obtener los mejores resultados posibles.
                    <ul>
                        <li>Subirlo de preferencia en formato CSV(solo se pueden subir archivos CSV o TXT)</li>
                        <li>Solo subirlo con los campos necesarios para el algoritmo</li>
                        <li>Quitar los campos que contengan el ID(Ej:Paciente_ID, etc)</li>
                        <li>Respetar el formato establecido en la siguiente sección</li>
                    </ul>
                    <Title level={3}>Formato</Title>
                </Paragraph>
                <List
                    grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 4,
                    md: 2,
                    lg: 4,
                    xl: 4,
                    xxl: 8,
                    }} 
                    dataSource={dataMetricas}
                    renderItem={item => (
                    <List.Item>
                        <Card title={item.title}  style={{ width: 240 }}><Image width={200} height={200} src={(item.imageSrc)} preview={item.preview}/></Card>
                    </List.Item>
                    )}
                />
                </TabPane>
                <TabPane tab={tabNames[2]} key="3">
                <Paragraph>
                    Para usar este algoritmo sube un archivo tomando en cuenta que tiene que cumplir con las siguientes características
                    para obtener los mejores resultados posibles.
                    <ul>
                        <li>Subirlo de preferencia en formato CSV(solo se pueden subir archivos CSV o TXT)</li>
                        <li>Solo subirlo con los campos necesarios para el algoritmo</li>
                        <li>Quitar los campos que contengan el ID(Ej:Paciente_ID, etc)</li>
                        <li>Respetar el formato establecido en la siguiente sección</li> 
                    </ul>
                    <Title level={3}>Formato</Title>
                </Paragraph>
                <List
                    grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 4,
                    md: 2,
                    lg: 4,
                    xl: 4,
                    xxl: 8,
                    }}
                    dataSource={dataClustering}
                    renderItem={item => (
                    <List.Item>
                        <Card title={item.title}  style={{ width: 240 }}><Image width={200} height={200} src={(item.imageSrc)} preview={item.preview}/></Card>
                    </List.Item>
                    )}
                />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default HowToSection;