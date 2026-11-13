
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import "./GraficoComTema.css";

// Dados demonstrativos: total de 20 áreas na estufa.
const dadosOcupacao = [
    { semana: "Sem. 1", ocupadas: 8, disponiveis: 12 },
    { semana: "Sem. 2", ocupadas: 10, disponiveis: 10 },
    { semana: "Sem. 3", ocupadas: 9, disponiveis: 11 },
    { semana: "Sem. 4", ocupadas: 12, disponiveis: 8 },
    { semana: "Sem. 5", ocupadas: 14, disponiveis: 6 },
    { semana: "Sem. 6", ocupadas: 16, disponiveis: 4 }
];

const GraficoComTema = () => {
    return (
        <section className="grafico-ocupacao-card">
            <div className="grafico-ocupacao-header">
                <div>
                    <span className="grafico-ocupacao-overline">
                        DESEMPENHO DA ESTUFA
                    </span>

                    <h2>Ocupação das áreas</h2>

                    <p>
                        Acompanhe a evolução das áreas ocupadas e disponíveis.
                    </p>
                </div>

                <div className="grafico-ocupacao-icon">
                    <i className="bi bi-graph-up-arrow"></i>
                </div>
            </div>

            <div className="grafico-ocupacao-legenda">
                <div className="grafico-ocupacao-indicador">
                    <span className="indicador-ponto ocupadas"></span>
                    <span>Áreas ocupadas</span>
                </div>

                <div className="grafico-ocupacao-indicador">
                    <span className="indicador-ponto disponiveis"></span>
                    <span>Áreas disponíveis</span>
                </div>
            </div>

            <div className="grafico-ocupacao-chart">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={dadosOcupacao}
                        margin={{
                            top: 10,
                            right: 15,
                            left: -15,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid
                            stroke="var(--border-color)"
                            strokeDasharray="4 4"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="semana"
                            tick={{
                                fill: "var(--text-secondary)",
                                fontSize: 12
                            }}
                            axisLine={{ stroke: "var(--border-color)" }}
                            tickLine={false}
                        />

                        <YAxis
                            domain={[0, 20]}
                            allowDecimals={false}
                            tick={{
                                fill: "var(--text-secondary)",
                                fontSize: 12
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "var(--surface)",
                                border: "1px solid var(--border-color)",
                                borderRadius: "10px",
                                color: "var(--text-color)",
                                boxShadow: "var(--card-shadow)"
                            }}
                            labelStyle={{
                                color: "var(--text-color)",
                                fontWeight: 600
                            }}
                            formatter={(value) => [`${value} áreas`]}
                        />

                        <Line
                            type="monotone"
                            dataKey="ocupadas"
                            name="Áreas ocupadas"
                            stroke="var(--primary)"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: "var(--primary)",
                                strokeWidth: 2,
                                stroke: "var(--surface)"
                            }}
                            activeDot={{ r: 7 }}
                        />

                        <Line
                            type="monotone"
                            dataKey="disponiveis"
                            name="Áreas disponíveis"
                            stroke="var(--accent)"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: "var(--accent)",
                                strokeWidth: 2,
                                stroke: "var(--surface)"
                            }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grafico-ocupacao-footer">
                <i className="bi bi-info-circle"></i>
                <span>
                    Dados ilustrativos para demonstração da ocupação da estufa.
                </span>
            </div>
        </section>
    );
};

export default GraficoComTema;
