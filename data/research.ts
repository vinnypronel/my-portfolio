export interface ResearchFindingData {
  value: string;
  label: string;
  detail: string;
  /** emphasized findings render as the large dark callout */
  emphasis?: boolean;
}

export interface ResearchNarrative {
  id: string;
  program: string;
  title: string;
  status?: "in-progress";
  advisor?: string;
  team?: string;
  timeframe: string;
  question: string;
  dataset?: string;
  methodology: string[];
  findings: ResearchFindingData[];
  presentation?: string;
  deliverables?: string;
  /** render the chart placeholder block (swap for real Google Charts exports) */
  showChart?: boolean;
}

export const researchNarratives: ResearchNarrative[] = [
  {
    id: "jobs-vs-wages",
    program: "IUSE Scholars Academy",
    title: "Jobs vs. Wages",
    advisor: "Faculty advisor: Prof. Pauline Wang",
    timeframe: "2025–26 academic year",
    question:
      "Does having a job guarantee a living wage? If employment alone doesn't predict income, what actually does?",
    dataset:
      "SimpleMaps uszips 2022, covering all 52 U.S. states and territories",
    methodology: [
      "Designed a MySQL database architecture with three purpose-built data marts: state_data, state_summary, and gny_county_data",
      "Built a PHP + Google Charts visualization layer producing bar and scatter charts from live queries",
      "Ran Pearson correlation analysis across four socioeconomic attributes: unemployment rate, poverty rate, college education rate, and median household income",
    ],
    findings: [
      {
        value: "r = −0.3753",
        label: "Unemployment ↔ income",
        detail:
          "Unemployment rate explains only ~14% of income variation. Having a job is a surprisingly weak predictor of earning a living wage.",
      },
      {
        value: "r = −0.7366",
        label: "Poverty ↔ income",
        detail:
          "Poverty rate is a much stronger predictor of income than unemployment, at nearly twice the correlation strength.",
      },
      {
        value: "r = 0.7872",
        label: "College education ↔ income",
        detail:
          "College education rate is the strongest predictor of median household income across all 52 states and territories.",
        emphasis: true,
      },
    ],
    presentation: "GMiS Research Posters Competition",
    deliverables:
      "Full student research journal and Excel analysis workbook completed alongside the database and visualization work. Puerto Rico was identified as the primary statistical outlier in the dataset.",
    showChart: true,
  },
  {
    id: "debate-coach",
    program: "CRA UR2PhD",
    title: "Debate Coach",
    advisor: "Faculty mentor: Dr. Yan Ma",
    team: "Team: Kiana Nunez, Matthew Ngoy · Grad mentor: Karina Ponze",
    timeframe: "2025–26 academic year",
    question:
      "How do different AI coaching configurations affect the quality, and the risks, of the argumentation advice they give?",
    methodology: [
      "Within-subjects study design: every participant experienced all three coaching conditions",
      "Three configurations of GPT-4o-mini: Condition A (vanilla), Condition B (prompted devil's advocate), and Condition C (fine-tuned)",
      "Structured evaluation of coaching output, including verification of every citation the models produced",
    ],
    findings: [
      {
        value: "100%",
        label: "Citation fabrication rate in Condition C",
        detail:
          "Every single citation produced by the fine-tuned configuration was fabricated. The most polished-sounding coach was also the least trustworthy, a finding with direct implications for anyone deploying fine-tuned models in education.",
        emphasis: true,
      },
    ],
    presentation: "UR2PhD conference showcase, New Orleans",
  },
  {
    id: "summer-visualization",
    program: "CRA UR2PhD-REU",
    title: "Java Execution Visualizer",
    status: "in-progress",
    advisor: "Advisor: Dr. Yan Ma",
    timeframe: "June 2026 to present · Kean University",
    question:
      "Does an AI-assisted interactive visualizer of Java execution improve learning outcomes and lower cognitive load for undergraduates, compared with static course materials?",
    methodology: [
      "Engineered a trace-ingestion pipeline that parses JDI and java jail execution traces into a structured event stream",
      "Rendered that stream as a live stack and heap view with reference arrows drawn between values",
      "Integrated Google Gemini to generate trace-aligned explanations alongside the visualization",
      "Running an IRB-approved pilot study measuring learning outcomes and cognitive load against static materials",
    ],
    findings: [],
    // Findings intentionally empty: the pilot study is still running, so this
    // card keeps the same in-progress pattern as before.
  },
];
