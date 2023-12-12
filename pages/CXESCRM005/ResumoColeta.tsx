import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";

const ResumoColeta = () => {
    return (
        <Tabs style={{ marginBottom: 9 }} value="Cliente">
            <TabsHeader style={{ color: 'black', backgroundColor: '#c4c8ce', height: 30 }}>
                <Tab value="DadosGerais" >
                    Dados Gerais
                </Tab>
                <Tab value="DadosUCS">
                    Dados das UCS
                </Tab>
                <Tab value="DadosKit">
                    Dados do Kit
                </Tab>
                <Tab value="Distribuicao">
                    Distribuição de Módulos
                </Tab>
                <Tab value="Conclusao">
                    Conclusão da Coleta
                </Tab>
            </TabsHeader>

            <TabsBody>
                <TabPanel value="DadosGerais">


                </TabPanel>
                <TabPanel value="DadosUCS">


                </TabPanel>
                <TabPanel value="DadosKit">


                </TabPanel>
                <TabPanel value="Distribuicao">


                </TabPanel>
                <TabPanel value="Conclusao">


                </TabPanel>
            </TabsBody>
        </Tabs>

    );
};

export default ResumoColeta;
