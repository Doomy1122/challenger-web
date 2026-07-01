"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Download,
  Gauge,
  Globe,
  Instagram,
  Mail,
  Menu,
  RadioTower,
  RefreshCw,
  Sparkles,
  Thermometer,
  Trophy,
  X,
  Youtube,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

const VEHICLE_IMAGE_SRC = "/gallery/df-25/KakaoTalk_20260629_1735219801.jpg";
const VEHICLE_IMAGE_ASPECT = "4 / 3.15";
const DIRECTION_IMAGE_SRC = "/gallery/df-26/KakaoTalk_20260423_213900869.jpg";

type Lang = "ko" | "en";

type Point = {
  title: string;
  desc: string;
};

type Hotspot = {
  name: string;
  x: string;
  y: string;
  title: string;
  desc: string;
  points: Point[];
};

type PageCopy = {
  nav: {
    vehicle: string;
    technology: string;
    direction: string;
    sponsors: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    desc: string;
    primary: string;
    secondary: string;
  };
  stats: { value: string; label: string }[];
  vehicle: {
    label: string;
    title: string;
    desc: string;
    hint: string;
    hotspots: Hotspot[];
  };
  philosophy: {
    label: string;
    title: string;
    desc: string;
    cards: { title: string; desc: string }[];
  };
  tech: {
    label: string;
    title: string;
    items: { title: string; desc: string }[];
  };
  direction: {
    label: string;
    title: string;
    desc: string;
    items: string[];
  };
  sponsor: {
    label: string;
    title: string;
    desc: string;
    proposal: string;
    contact: string;
    instagram: string;
  };
};

const HOTSPOTS_KO: Hotspot[] = [
  {
    name: "Suspension",
    x: "50%",
    y: "60%",
    title: "Suspension",
    desc: "Suspension 파트는 차량과 노면을 연결하며, 타이어가 가진 성능을 실제 주행 성능으로 끌어내는 핵심 시스템입니다. 단순히 차체를 지지하는 장치가 아닌, 가속·제동·코너링 순간마다 하중 이동을 제어하고 타이어 접지력을 유지해 차량의 한계를 결정합니다.",
    points: [
      {
        title: "Maximized Tire Contact",
        desc: "캠버 변화와 하중 이동을 정밀하게 설계해, 코너링·제동·가속 순간에도 타이어가 노면을 끝까지 붙잡도록 만듭니다.",
      },
      {
        title: "Active Anti-Roll Bar",
        desc: "Active Anti-Roll Bar를 통해 롤 강성과 좌우 하중 이동을 능동적으로 제어하며, Suspension을 단순한 설계를 넘어 Chassis Control 시스템으로 확장합니다.",
      },
    ],
  },
  {
    name: "Frame",
    x: "30%",
    y: "55%",
    title: "Frame",
    desc: "Frame 파트는 차량의 모든 시스템을 하나로 연결하는 구조적 기반입니다. CHALLENGER는 Space Frame 구조의 경량성과 강성을 극한까지 끌어올리고, 실제 비틀림 강성 실측을 통해 설계가 실차에서 어떻게 작동하는지 데이터로 검증하고 있습니다.",
    points: [
      {
        title: "Lightweight Space Frame Platform",
        desc: "불필요한 중량은 줄이고, 하중이 집중되는 구간에는 강성을 확보해 경량화와 구조 안정성을 동시에 추구합니다. Frame은 단순한 차체가 아닌, 차량 전체 성능을 지탱하는 핵심 플랫폼입니다.",
      },
      {
        title: "Verified Torsional Rigidity",
        desc: "프레임 비틀림 강성을 직접 실측하여 해석 기반 설계의 신뢰성을 검증했습니다. 이를 통해 서스펜션 세팅과 차량 거동 예측의 기준이 되는 구조 강성을 데이터로 확보했습니다.",
      },
    ],
  },
  {
    name: "Ergonomics",
    x: "58%",
    y: "40%",
    title: "Ergonomics",
    desc: "Ergonomics 파트는 드라이버와 차량을 연결하는 가장 중요한 인터페이스입니다. CHALLENGER는 단순한 탑승 편의성을 넘어, 모든 조작이 직관적이고 일관되게 전달될 수 있도록 Cockpit과 Driver Interface를 최적화하여, 드라이버가 차량의 성능을 한계까지 활용할 수 있는 환경을 구현합니다.",
    points: [
      {
        title: "Driver-Centric Cockpit",
        desc: "드라이빙 포지션과 조작계 배치를 최적화하여 모든 입력이 빠르고 자연스럽게 전달되도록 설계했습니다. 차량이 드라이버에 맞추는 것이 아닌, 드라이버와 차량이 하나처럼 움직이는 Cockpit을 구현합니다.",
      },
      {
        title: "Performance Driver Interface",
        desc: "회생제동 전용 Brake Hardware와 자체 설계 Accelerator Pedal Hardware를 통해 정밀한 제동과 가속 입력을 구현합니다. 드라이버의 의도를 더욱 정확하게 차량에 전달하는 인터페이스를 완성했습니다.",
      },
    ],
  },
  {
    name: "Drive Train",
    x: "75%",
    y: "40%",
    title: "Drive Train",
    desc: "Drivetrain 파트는 모터에서 발생한 토크를 손실 없이 노면으로 전달하는 차량의 동력 전달 시스템입니다. CHALLENGER는 단순히 강한 구동계를 만드는 것을 넘어, 불필요한 중량을 줄이고 각 부품의 사용 마일리지를 관리하여 경량화와 신뢰성을 동시에 확보합니다. 고출력 전기 구동 환경에서도 일정한 성능을 유지할 수 있도록, 구조·정비성·품질관리를 함께 설계하는 파트입니다.",
    points: [
      {
        title: "Lightweight Power Delivery",
        desc: "동력 전달에 필요한 강성은 확보하면서 불필요한 질량은 최소화하여, 회전 관성과 차량 중량을 줄입니다. 이를 통해 모터의 토크가 더 빠르고 효율적으로 차량의 가속 성능으로 이어지도록 설계합니다.",
      },
      {
        title: "Mileage-Based Quality Control",
        desc: "체인, 스프로킷, 베어링 등 주요 구동 부품의 사용 시간을 추적하고 관리하여, 성능 저하와 고장을 사전에 방지합니다. Drivetrain은 단순한 조립품이 아니라, 데이터 기반 품질관리로 완성되는 신뢰성 시스템입니다.",
      },
    ],
  },
  {
    name: "Cooling",
    x: "78%",
    y: "33%",
    title: "Cooling",
    desc: "Cooling 파트는 고출력 전기 구동 시스템이 한계 상황에서도 안정적으로 성능을 유지하도록 열을 제어하는 핵심 시스템입니다. CHALLENGER는 단순히 온도가 오른 뒤 냉각하는 방식이 아니라, 모터·인버터·배터리의 온도 변화와 주행 부하를 기반으로 선제적으로 냉각을 제어하는 Predictive Thermal Control 시스템을 지향합니다. 이를 통해 출력 제한을 늦추고, 내구 주행 동안 일관된 퍼포먼스를 유지하는 열관리 전략을 완성합니다.",
    points: [
      {
        title: "Predictive Temperature Control",
        desc: "온도가 위험 수준에 도달한 뒤 반응하는 것이 아니라, 온도 상승 추세를 예측해 팬과 펌프를 선제적으로 제어합니다. 이를 통해 냉각 응답 지연을 줄이고, 고부하 주행에서도 안정적인 열 균형을 유지합니다.",
      },
      {
        title: "Consistent Power Performance",
        desc: "모터와 인버터의 열 포화를 억제하여 출력 저하를 최소화하고, 내구 주행 후반까지 일정한 구동 성능을 유지합니다. Cooling은 단순한 보조 시스템이 아닌, 차량의 퍼포먼스를 끝까지 지켜내는 성능 제어 시스템입니다.",
      },
    ],
  },
  {
    name: "Aero",
    x: "10%",
    y: "57%",
    title: "Aero",
    desc: "Aero Dynamics 파트는 차량 주변의 공기 흐름을 설계해, 타이어가 더 강하게 노면을 붙잡을 수 있도록 다운포스를 만들어내는 성능 시스템입니다. CHALLENGER는 단순히 기존 에어포일을 적용하는 것을 넘어, 차량 특성에 맞춘 자체 에어포일 형상을 설계하고 해석 정합성을 최적화하여 공력 성능의 신뢰도를 높이고 있습니다. 이를 통해 코너링 안정성과 고속 주행 성능을 동시에 끌어올리는 Aero Package를 완성합니다.",
    points: [
      {
        title: "Self-Developed Airfoil Design",
        desc: "차량의 속도 영역과 주행 조건에 맞춰 자체 에어포일 형상을 설계하여, 다운포스와 항력의 균형을 최적화합니다. 단순한 형상 적용이 아닌, CHALLENGER만의 공력 특성을 만들어가는 설계입니다.",
      },
      {
        title: "Correlation-Based CFD Optimization",
        desc: "해석 결과가 실제 차량 거동과 최대한 일치하도록 CFD 조건과 결과를 검증하고 보정합니다. 이를 통해 해석을 단순 예측이 아닌, 실차 성능을 설계하는 신뢰성 있는 개발 도구로 발전시킵니다.",
      },
    ],
  },
  {
    name: "Motor Control",
    x: "62%",
    y: "32%",
    title: "Motor Control",
    desc: "Motor&Control 파트는 전기 포뮬러 차량의 구동 성능과 에너지 흐름을 제어하는 핵심 시스템입니다. CHALLENGER는 모터·인버터·배터리의 한계를 실시간으로 관리하며, VCU를 중심으로 토크 제어, Field Weakening, Break Speed, 회생제동, 냉각 제어, 안전 로직을 통합합니다. 단순히 모터를 구동하는 것을 넘어, 차량의 출력·효율·안정성을 하나의 제어 시스템으로 완성하는 Electric Performance Control을 구현합니다.",
    points: [
      {
        title: "Voltage-Limited Torque Control",
        desc: "저전압 배터리 환경에서도 고속 영역 성능을 확보하기 위해 Field Weakening과 Break Speed 기반 토크 제어를 적용합니다. 전압과 전류 한계 안에서 토크를 정밀하게 제어하여, 제한된 전력으로도 차량의 가속 성능을 끝까지 끌어냅니다.",
      },
      {
        title: "VCU-Based Integrated Control",
        desc: "VCU는 APPS, BMS, 인버터, 냉각 시스템의 데이터를 통합해 차량 상태에 맞는 토크와 회생제동을 실시간으로 결정합니다. 이를 통해 Motor&Control은 단일 부품 제어를 넘어, 차량 전체의 성능과 안전을 관리하는 통합 제어 시스템으로 확장됩니다.",
      },
    ],
  },
  {
    name: "HV",
    x: "68%",
    y: "40%",
    title: "HV",
    desc: "High Voltage 파트는 전기 포뮬러 차량의 에너지를 안전하게 저장하고, 필요한 순간 모터와 인버터로 안정적으로 전달하는 전력 시스템의 핵심입니다. CHALLENGER는 단순히 고전압을 사용하는 것이 아니라, Accumulator, BMS, Precharge, Shutdown Circuit, 절연 안전 구조를 통해 규정을 만족하는 전기 안전 플랫폼을 구축합니다. High Voltage는 차량의 강한 출력을 가능하게 하면서도, 모든 주행 상황에서 안전이 먼저 작동하도록 설계되는 파트입니다.",
    points: [
      {
        title: "Rule-Based Safety Architecture",
        desc: "고전압 시스템의 절연, 차단, 프리차지, 비상 정지 구조를 규정에 맞춰 설계하여 차량과 드라이버를 보호합니다. 출력보다 먼저 안전을 완성하고, 안전 위에서 성능을 끌어내는 HV 구조를 구현합니다.",
      },
      {
        title: "Reliable Energy Delivery",
        desc: "배터리에서 인버터까지 이어지는 전력 경로를 안정적으로 설계해 전압 손실과 시스템 리스크를 최소화합니다. 고출력 주행 중에도 모터가 필요한 에너지를 안정적으로 공급받을 수 있도록, 전력 전달 신뢰성을 확보합니다.",
      },
    ],
  },
  {
    name: "LV",
    x: "60.5%",
    y: "21.2%",
    title: "LV",
    desc: "Low Voltage 파트는 차량의 센서, 제어기, 통신, 안전 회로를 안정적으로 구동하는 전장 시스템의 기반입니다. CHALLENGER는 단순히 전원을 공급하는 것을 넘어, VCU가 정확한 판단을 내릴 수 있도록 신뢰성 있는 전원·신호·통신 환경을 설계합니다. 작은 전압으로 차량 전체의 상태를 감지하고, 고전압 시스템과 구동 제어가 안전하게 작동하도록 만드는 차량의 전기적 신경망입니다.",
    points: [
      {
        title: "Stable GLV Architecture",
        desc: "VCU, 센서, 통신 장치가 안정적으로 동작할 수 있도록 저전압 전원 구조를 설계합니다. 전압 강하, 노이즈, 접지 문제를 최소화하여 차량 제어 시스템의 신뢰성을 확보합니다.",
      },
      {
        title: "Signal & Communication Reliability",
        desc: "APPS, BPS, BMS, 인버터 등 핵심 데이터를 VCU로 정확하게 전달하기 위해 CAN 통신과 센서 신호 체계를 관리합니다. Low Voltage는 차량의 모든 판단이 정확한 데이터에서 시작되도록 만드는 기반 시스템입니다.",
      },
    ],
  },
];

const HOTSPOTS_EN: Hotspot[] = [
  {
    name: "Suspension",
    x: "55%",
    y: "55%",
    title: "Suspension",
    desc: "The Suspension part connects the vehicle and the road surface, and is a core system that converts the tire's potential into actual driving performance. It is not simply a device that supports the chassis; at every moment of acceleration, braking, and cornering, it controls load transfer, maintains tire contact, and determines the vehicle's limit.",
    points: [
      {
        title: "Maximized Tire Contact",
        desc: "By precisely designing camber change and load transfer, the tire is made to hold the road surface to the end during cornering, braking, and acceleration.",
      },
      {
        title: "Active Anti-Roll Bar",
        desc: "Through the Active Anti-Roll Bar, roll stiffness and left-right load transfer are actively controlled, expanding Suspension beyond simple design into a Chassis Control system.",
      },
    ],
  },
  {
    name: "Frame",
    x: "36%",
    y: "56%",
    title: "Frame",
    desc: "The Frame part is the structural foundation that connects every system of the vehicle into one. CHALLENGER pushes the lightness and stiffness of the Space Frame structure to the limit, and verifies with data how the design works on the actual vehicle through real torsional rigidity measurement.",
    points: [
      {
        title: "Lightweight Space Frame Platform",
        desc: "Unnecessary weight is reduced, while stiffness is secured in sections where loads are concentrated, pursuing both lightweight design and structural stability. The Frame is not a simple body, but the core platform that supports the performance of the entire vehicle.",
      },
      {
        title: "Verified Torsional Rigidity",
        desc: "Frame torsional rigidity was directly measured to verify the reliability of analysis-based design. Through this, structural stiffness data was secured as the basis for suspension setup and vehicle behavior prediction.",
      },
    ],
  },
  {
    name: "Ergonomics",
    x: "43%",
    y: "49%",
    title: "Ergonomics",
    desc: "The Ergonomics part is the most important interface connecting the driver and the vehicle. Beyond simple seating comfort, CHALLENGER optimizes the Cockpit and Driver Interface so that every control input can be delivered intuitively and consistently, creating an environment where the driver can use the vehicle's performance up to its limit.",
    points: [
      {
        title: "Driver-Centric Cockpit",
        desc: "The driving position and control layout were optimized so that every input is delivered quickly and naturally. Rather than making the driver adapt to the vehicle, it creates a Cockpit where the driver and vehicle move as one.",
      },
      {
        title: "Performance Driver Interface",
        desc: "Precise braking and acceleration inputs are implemented through dedicated regenerative-braking Brake Hardware and self-designed Accelerator Pedal Hardware. This completes an interface that delivers the driver's intent to the vehicle more accurately.",
      },
    ],
  },
  {
    name: "Drive Train",
    x: "17%",
    y: "60%",
    title: "Drive Train",
    desc: "The Drivetrain part is the vehicle's power transmission system that delivers torque generated by the motor to the road surface without loss. Beyond simply making a strong drivetrain, CHALLENGER reduces unnecessary weight and manages the mileage of each component to secure both lightweight design and reliability. It is a part that designs structure, maintainability, and quality control together so that consistent performance can be maintained even in a high-output electric drive environment.",
    points: [
      {
        title: "Lightweight Power Delivery",
        desc: "While securing the stiffness required for power transmission, unnecessary mass is minimized to reduce rotational inertia and vehicle weight. Through this, the motor's torque is connected more quickly and efficiently to the vehicle's acceleration performance.",
      },
      {
        title: "Mileage-Based Quality Control",
        desc: "The usage time of major drivetrain components such as chains, sprockets, and bearings is tracked and managed to prevent performance degradation and failure in advance. The Drivetrain is not a simple assembly, but a reliability system completed through data-based quality control.",
      },
    ],
  },
  {
    name: "Cooling",
    x: "23%",
    y: "56%",
    title: "Cooling",
    desc: "The Cooling part is a core system that controls heat so that the high-output electric drive system can stably maintain performance even at its limits. CHALLENGER does not simply cool after the temperature rises; it aims for a Predictive Thermal Control system that proactively controls cooling based on temperature changes of the motor, inverter, and battery, as well as driving load. Through this, it delays output limitation and completes a thermal management strategy that maintains consistent performance during endurance driving.",
    points: [
      {
        title: "Predictive Temperature Control",
        desc: "Instead of reacting after the temperature reaches a dangerous level, the fan and pump are proactively controlled by predicting the temperature rise trend. This reduces cooling response delay and maintains a stable thermal balance even during high-load driving.",
      },
      {
        title: "Consistent Power Performance",
        desc: "By suppressing thermal saturation of the motor and inverter, output derating is minimized and consistent drive performance is maintained until the latter half of endurance driving. Cooling is not a simple auxiliary system, but a performance control system that protects the vehicle's performance to the end.",
      },
    ],
  },
  {
    name: "Aero",
    x: "84%",
    y: "80%",
    title: "Aero",
    desc: "The Aero Dynamics part is a performance system that designs the airflow around the vehicle and creates downforce so the tires can grip the road more strongly. Beyond simply applying an existing airfoil, CHALLENGER designs its own airfoil shape suited to the vehicle characteristics and optimizes analysis correlation to improve the reliability of aerodynamic performance. Through this, it completes an Aero Package that raises both cornering stability and high-speed driving performance.",
    points: [
      {
        title: "Self-Developed Airfoil Design",
        desc: "A self-developed airfoil shape is designed for the vehicle's speed range and driving conditions to optimize the balance between downforce and drag. It is not just applying a shape, but a design that builds CHALLENGER's own aerodynamic characteristics.",
      },
      {
        title: "Correlation-Based CFD Optimization",
        desc: "CFD conditions and results are verified and corrected so that analysis results match actual vehicle behavior as closely as possible. Through this, analysis is developed from a simple prediction into a reliable development tool that designs real vehicle performance.",
      },
    ],
  },
  {
    name: "Motor Control",
    x: "60%",
    y: "37%",
    title: "Motor Control",
    desc: "The Motor&Control part is the core system that controls the driving performance and energy flow of an electric formula vehicle. CHALLENGER manages the limits of the motor, inverter, and battery in real time, and integrates torque control, Field Weakening, Break Speed, regenerative braking, cooling control, and safety logic around the VCU. Beyond simply driving the motor, it implements Electric Performance Control that completes the vehicle's output, efficiency, and stability as one control system.",
    points: [
      {
        title: "Voltage-Limited Torque Control",
        desc: "To secure high-speed performance even in a low-voltage battery environment, Field Weakening and Break Speed based torque control are applied. Torque is precisely controlled within voltage and current limits, extracting the vehicle's acceleration performance to the end even with limited power.",
      },
      {
        title: "VCU-Based Integrated Control",
        desc: "The VCU integrates data from APPS, BMS, inverter, and cooling system to determine torque and regenerative braking in real time according to vehicle state. Through this, Motor&Control expands beyond single-component control into an integrated control system that manages the performance and safety of the entire vehicle.",
      },
    ],
  },
  {
    name: "HV",
    x: "30%",
    y: "60%",
    title: "HV",
    desc: "The High Voltage part is the core of the power system that safely stores the energy of the electric formula vehicle and stably delivers it to the motor and inverter when needed. CHALLENGER does not simply use high voltage; it builds an electrical safety platform that satisfies the rules through the Accumulator, BMS, Precharge, Shutdown Circuit, and insulation safety structure. High Voltage is the part that enables the vehicle's strong output while making safety operate first in every driving situation.",
    points: [
      {
        title: "Rule-Based Safety Architecture",
        desc: "The insulation, shutdown, precharge, and emergency stop structure of the high-voltage system are designed according to the rules to protect the vehicle and driver. It implements an HV structure that completes safety before output and extracts performance on top of safety.",
      },
      {
        title: "Reliable Energy Delivery",
        desc: "The power path from the battery to the inverter is stably designed to minimize voltage loss and system risk. Even during high-output driving, power delivery reliability is secured so the motor can receive the energy it needs stably.",
      },
    ],
  },
  {
    name: "LV",
    x: "43%",
    y: "20%",
    title: "LV",
    desc: "The Low Voltage part is the foundation of the electrical system that stably operates the vehicle's sensors, controller, communication, and safety circuits. Beyond simply supplying power, CHALLENGER designs a reliable power, signal, and communication environment so the VCU can make accurate decisions. It is the vehicle's electrical nervous system that senses the entire vehicle state with small voltage and makes the high-voltage system and drive control operate safely.",
    points: [
      {
        title: "Stable GLV Architecture",
        desc: "The low-voltage power structure is designed so that the VCU, sensors, and communication devices can operate stably. Voltage drop, noise, and grounding issues are minimized to secure the reliability of the vehicle control system.",
      },
      {
        title: "Signal & Communication Reliability",
        desc: "CAN communication and sensor signal systems are managed to accurately deliver key data such as APPS, BPS, BMS, and inverter data to the VCU. Low Voltage is the foundation system that makes every vehicle decision start from accurate data.",
      },
    ],
  },
];

const copy: Record<Lang, PageCopy> = {
  ko: {
    nav: {
      vehicle: "VEHICLE",
      technology: "TECHNOLOGY",
      direction: "DIRECTION",
      sponsors: "PARTNER",
    },
    hero: {
      eyebrow: "CHALLENGER DIGITAL GARAGE",
      title: "BUILT TO PROVE LIMITS.",
      desc: "CHALLENGER는 전기 포뮬러 차량의 한계를 데이터와 제어로 증명합니다.",
      primary: "차량 파트 보기",
      secondary: "후원 문의하기",
    },
    stats: [
      { value: "GOLD", label: "2025 FSK E-Formula" },
      { value: "1st", label: "2025 Acceleration Award" },
      { value: "2.98s", label: "0–100km/h Acceleration" },
      { value: "5.38", label: "Energy Eff [km/kWh]" },
    ],
    vehicle: {
      label: "Interactive Vehicle",
      title: "CHALLENGER의 파트를 확인하세요.",
      desc: "CHALLENGER의 차량은 프레임, 서스펜션, 구동계, 전장, 공력, 냉각, 제어가 하나의 시스템으로 연결되어 완성됩니다.",
      hint: "번호 마커를 눌러 파트를 확인하세요",
      hotspots: HOTSPOTS_KO,
    },
    philosophy: {
      label: "Why CHALLENGER",
      title: "WE DO NOT GUESS THE LIMIT.",
      desc: "CHALLENGER는 감으로 차량을 세팅하지 않습니다. 주행 데이터, 제어 로직, 전력 시스템 분석을 기반으로 차량의 한계를 정량적으로 파악하고, 그 한계까지 사용합니다.",
      cards: [
        {
          title: "CONTROL",
          desc: "차량의 모든 구동 명령을 제어 관점에서 설계합니다.",
        },
        {
          title: "DATA",
          desc: "주행 로그를 기반으로 세팅의 근거를 남깁니다.",
        },
        {
          title: "ENERGY",
          desc: "내구 주행에서 살아남는 전력 전략을 만듭니다.",
        },
      ],
    },
    tech: {
      label: "Technology Stack",
      title: "차량을 하나의 시스템으로 연결합니다.",
      items: [
        {
          title: "VCU Control",
          desc: "APPS, BPS, 인버터, BMS, 차량 상태 데이터를 통합해 차량을 제어합니다.",
        },
        {
          title: "Regen Strategy",
          desc: "회생제동을 통해 에너지 회수량을 극대화하여 차량을 한계까지 몰아붙입니다.",
        },
        {
          title: "Thermal Control",
          desc: "CHALLENGER만의 온또 에츢 모뗼을 통햬 차량 넁각 시스템이 구동됩니다.",
        },
        {
          title: "Wireless Data",
          desc: "100 Hz급 무선 데이터 수집을 목표로 실시간 차량 상태를 추적합니다.",
        },
        {
          title: "Limit Tuning",
          desc: "차량 한계를 정량화하고, 그 한계까지 사용할 수 있도록 모든 시스템을 세팅합니다.",
        },
      ],
    },
    direction: {
      label: "2026 Direction",
      title: "COOPERATIVE CONTROL",
      desc: "2026 CHALLENGER는 모터 제어, 냉각, 무선 데이터, 공력 장치, 차량 섀시 제어를 하나의 차량 제어 전략으로 연결하는 것을 목표로 합니다.",
      items: [
        "모터 제어 기반 성능 최적화",
        "회생제동 기반 내구 주행 전략",
        "냉각 / 전력 / 구동 협조제어",
        "주행 데이터 기반 차량 한계 정량화",
      ],
    },
    sponsor: {
      label: "Partner With CHALLENGER",
      title: "후원은 로고 노출을 넘어, 기술 성장의 파트너십으로 기록됩니다.",
      desc: "CHALLENGER의 후원사는 학생 엔지니어들이 실제 전기 포뮬러 차량을 설계하고, 제작하고, 검증하는 과정에 함께 이름을 남깁니다.",
      proposal: "후원 제안서 다운로드",
      contact: "후원 문의하기",
      instagram: "Instagram",
    },
  },
  en: {
    nav: {
      vehicle: "VEHICLE",
      technology: "TECHNOLOGY",
      direction: "DIRECTION",
      sponsors: "PARTNER",
    },
    hero: {
      eyebrow: "CHALLENGER DIGITAL GARAGE",
      title: "BUILT TO PROVE LIMITS.",
      desc: "CHALLENGER proves the limits of an electric Formula vehicle through data and control.",
      primary: "Explore Vehicle Parts",
      secondary: "Sponsor Partnership",
    },
    stats: [
      { value: "GOLD", label: "2025 FSK E-Formula" },
      { value: "1st", label: "2025 Acceleration Award" },
      { value: "2.98s", label: "0–100km/h Acceleration" },
      { value: "5.38", label: "km/kWh Energy Eff" },
    ],
    vehicle: {
      label: "Interactive Vehicle",
      title: "Explore CHALLENGER Parts.",
      desc: "CHALLENGER's vehicle is completed by connecting the frame, suspension, drivetrain, electronics, aero, cooling, and control into one system.",
      hint: "Tap the numbered markers",
      hotspots: HOTSPOTS_EN,
    },
    philosophy: {
      label: "Why CHALLENGER",
      title: "WE DO NOT GUESS THE LIMIT.",
      desc: "CHALLENGER does not tune the vehicle by feel. Based on driving data, control logic, and power system analysis, we quantitatively identify the vehicle's limits and use it up to those limits.",
      cards: [
        {
          title: "CONTROL",
          desc: "We design every drive command of the vehicle from a control perspective.",
        },
        {
          title: "DATA",
          desc: "We leave the basis of the setup through driving logs.",
        },
        {
          title: "ENERGY",
          desc: "We build a power strategy that survives endurance driving.",
        },
      ],
    },
    tech: {
      label: "Technology Stack",
      title: "We connect the vehicle into one system.",
      items: [
        {
          title: "VCU Control",
          desc: "APPS, BPS, inverter, and BMS data are integrated to determine Control Logic.",
        },
        {
          title: "Regen Strategy",
          desc: "Regenerative braking is designed at the balance point between energy recovery and vehicle stability.",
        },
        {
          title: "Thermal Control",
          desc: "Cooling logic is configured based on CHALLENGER's Predictive Thermal Model.",
        },
        {
          title: "Wireless Data",
          desc: "We target 100 Hz wireless data acquisition to track real-time vehicle states.",
        },
        {
          title: "Limit Tuning",
          desc: "We quantify vehicle limits and tune the car so those limits can be used.",
        },
      ],
    },
    direction: {
      label: "2026 Direction",
      title: "COOPERATIVE CONTROL",
      desc: "In 2026, CHALLENGER aims to connect motor control, cooling, wireless data, and aerodynamic devices into one vehicle control strategy.",
      items: [
        "Performance optimization based on motor control",
        "Endurance driving strategy based on regenerative braking",
        "Cooling / power / drive cooperative control",
        "Vehicle limit quantification based on driving data",
      ],
    },
    sponsor: {
      label: "Partner With CHALLENGER",
      title: "Sponsorship is recorded beyond logo exposure, as a partnership of technical growth.",
      desc: "CHALLENGER's sponsors leave their names in the process where student engineers design, build, and validate an actual electric Formula vehicle.",
      proposal: "Download Sponsorship Proposal",
      contact: "Contact Team",
      instagram: "Instagram",
    },
  },
};

const techIcons = [Cpu, RefreshCw, Thermometer, RadioTower, Gauge];

function PartDetailCard({
  active,
  activeIndex,
  parts,
  onClose,
  onSelect,
  className = "",
}: {
  active: Hotspot;
  activeIndex: number;
  parts: Hotspot[];
  onClose: () => void;
  onSelect: (idx: number) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <button
        onClick={onClose}
        className="absolute right-5 top-5 w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-[#950000] transition flex items-center justify-center"
        aria-label="Close"
      >
        <X size={22} />
      </button>

      <div className="pr-14">
        <p className="text-xs font-black tracking-[0.35em] text-[#950000] uppercase">
          Part {String(activeIndex + 1).padStart(2, "0")}
        </p>

        <h3 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
          {active.title}
        </h3>
      </div>

      <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-5 md:gap-10">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <p className="text-[11px] font-black tracking-[0.3em] text-gray-500 uppercase">
            Role
          </p>
          <h4 className="mt-3 text-xl md:text-2xl font-black text-white">
            What this part does
          </h4>
          <p className="mt-4 text-gray-300 text-base md:text-lg leading-loose break-keep">
            {active.desc}
          </p>
        </div>

        <div className="rounded-[24px] border border-[#950000]/30 bg-[#950000]/10 p-6 md:p-8">
          <p className="text-[11px] font-black tracking-[0.3em] text-[#950000] uppercase">
            Key Points
          </p>

          <div className="mt-5 space-y-4">
            {active.points.map((point, idx) => (
              <div
                key={point.title}
                className="rounded-2xl border border-white/10 bg-black/45 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#950000] flex items-center justify-center shrink-0 text-xs font-black text-white">
                    {idx + 1}
                  </div>

                  <div>
                    <h5 className="text-lg md:text-xl font-black text-white">
                      {point.title}
                    </h5>
                    <p className="mt-2 text-sm md:text-base text-gray-400 leading-relaxed break-keep">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 pt-5 border-t border-white/10">
        <p className="mb-3 text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">
          Jump to part
        </p>

        <div className="flex flex-wrap gap-2">
          {parts.map((spot, idx) => (
            <button
              key={spot.name}
              onClick={() => onSelect(idx)}
              className={`rounded-full border px-4 py-2 text-xs font-black transition ${
                idx === activeIndex
                  ? "border-[#950000] bg-[#950000] text-white"
                  : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              {spot.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GaragePage() {
  const { language, toggleLanguage } = useLanguage();
  const currentLanguage = language as Lang;
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const t = copy[currentLanguage];
  const active =
    activeHotspot !== null ? t.vehicle.hotspots[activeHotspot] : null;

  const handleSelectPart = (idx: number) => {
    setActiveHotspot(idx);

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      window.setTimeout(() => {
        document.getElementById("mobile-part-detail")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }
  };

  return (
    <div className={`min-h-screen bg-black text-white ${inter.className}`}>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="CHALLENGER Logo"
              className="h-10 md:h-14 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-black tracking-[0.18em] text-gray-300">
            <a href="#vehicle" className="hover:text-[#950000] transition">
              {t.nav.vehicle}
            </a>
            <a href="#technology" className="hover:text-[#950000] transition">
              {t.nav.technology}
            </a>
            <a href="#direction" className="hover:text-[#950000] transition">
              {t.nav.direction}
            </a>
            <a href="#partner" className="hover:text-[#950000] transition">
              {t.nav.sponsors}
            </a>
            <Link href="/" className="hover:text-[#950000] transition">
              HOME
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition text-xs font-bold"
            >
              <Globe size={14} />
              {currentLanguage === "ko" ? "ENG" : "KOR"}
            </button>

            <button
              onClick={() => setMobileMenu((prev) => !prev)}
              className="md:hidden p-2 rounded-full border border-white/10"
              aria-label="Open menu"
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 flex flex-col gap-5 text-sm font-black tracking-[0.18em] text-gray-300">
            <a onClick={() => setMobileMenu(false)} href="#vehicle">
              {t.nav.vehicle}
            </a>
            <a onClick={() => setMobileMenu(false)} href="#technology">
              {t.nav.technology}
            </a>
            <a onClick={() => setMobileMenu(false)} href="#direction">
              {t.nav.direction}
            </a>
            <a onClick={() => setMobileMenu(false)} href="#partner">
              {t.nav.sponsors}
            </a>
            <Link onClick={() => setMobileMenu(false)} href="/">
              HOME
            </Link>
          </div>
        )}
      </nav>

      <section className="relative min-h-[100dvh] overflow-hidden flex items-center pt-20">
        <div className="absolute inset-0">
          <img
            src={VEHICLE_IMAGE_SRC}
            alt="CHALLENGER DF-25"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
          <div className="absolute inset-0 md:bg-gradient-to-r md:from-black md:via-black/75 md:to-black/30" />
          <div className="absolute -right-40 top-20 w-[520px] h-[520px] rounded-full bg-[#950000]/20 blur-[120px]" />
          <div className="absolute -left-40 bottom-0 w-[520px] h-[520px] rounded-full bg-white/10 blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-6 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-7">
              <Sparkles size={16} className="text-[#950000]" />
              <span className="text-[10px] md:text-xs font-black tracking-[0.25em] md:tracking-[0.3em] text-gray-300">
                {t.hero.eyebrow}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">
              {t.hero.title}
            </h1>

            <p className="mt-7 max-w-2xl text-lg md:text-2xl text-gray-300 leading-relaxed break-keep">
              {t.hero.desc}
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a
                href="#vehicle"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-black hover:bg-[#950000] hover:text-white transition"
              >
                {t.hero.primary}
                <ArrowRight size={18} />
              </a>
              <a
                href="#partner"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-black/30 backdrop-blur text-white font-black hover:bg-white/10 transition"
              >
                {t.hero.secondary}
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>

      </section>

      <section className="relative z-20 bg-black pt-8 md:pt-10 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {t.stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-zinc-950/85 backdrop-blur p-5 md:p-8"
              >
                <div className="text-3xl md:text-5xl font-black text-white">
                  {item.value}
                </div>
                <div className="mt-3 text-[10px] md:text-sm text-gray-400 font-bold uppercase tracking-[0.12em]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vehicle" className="py-16 md:py-20 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-7">
            <p className="text-xs tracking-[0.35em] font-black text-[#950000] uppercase">
              {t.vehicle.label}
            </p>

            <h2 className="mt-4 text-[2.15rem] leading-[1.15] md:text-6xl md:leading-tight font-black break-keep">
              {t.vehicle.title}
            </h2>

            <p className="mt-4 text-gray-400 text-base md:text-lg leading-relaxed break-keep">
              {t.vehicle.desc}
            </p>

            <div className="mt-6 flex md:hidden">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-black tracking-[0.08em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#950000]" />
                {t.vehicle.hint}
              </div>
            </div>
          </div>

          <div className="relative rounded-[30px] md:rounded-[44px] overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_40px_100px_rgba(0,0,0,0.65)]">
            <div
              className="relative w-full bg-black"
              style={{ aspectRatio: VEHICLE_IMAGE_ASPECT }}
            >
              <img
                src={VEHICLE_IMAGE_SRC}
                alt="CHALLENGER vehicle interactive view"
                className={`absolute inset-0 w-full h-full object-contain transition duration-500 ${
                  active
                    ? "md:blur-sm md:scale-105 md:opacity-55 opacity-95"
                    : "opacity-95"
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/30" />

              {active && (
                <button
                  aria-label="Close popup"
                  onClick={() => setActiveHotspot(null)}
                  className="hidden md:block absolute inset-0 z-20 bg-black/45 backdrop-blur-[2px]"
                />
              )}

              {!active && (
                <div className="hidden md:flex absolute left-5 right-5 top-5 z-10 items-center justify-between gap-4">
                  <div className="rounded-full border border-white/10 bg-black/60 backdrop-blur px-4 py-2 text-xs font-black tracking-[0.18em] text-white/75">
                    {t.vehicle.hint}
                  </div>

                  <div className="rounded-full border border-[#950000]/40 bg-[#950000]/20 px-4 py-2 text-xs font-black tracking-[0.18em] text-white">
                    DIGITAL GARAGE
                  </div>
                </div>
              )}

              {t.vehicle.hotspots.map((spot, idx) => (
                <button
                  key={spot.name}
                  onClick={() => handleSelectPart(idx)}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 group ${
                    active
                      ? "md:pointer-events-none md:opacity-20 opacity-100"
                      : "opacity-100"
                  }`}
                  style={{ left: spot.x, top: spot.y }}
                  aria-label={spot.name}
                >
                  <span className="absolute -inset-4 rounded-full" />

                  <span className="absolute left-1/2 top-1/2 w-7 h-7 md:w-10 md:h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/20 backdrop-blur-[2px] transition duration-300 group-hover:scale-125 group-hover:border-[#950000]/80 group-hover:bg-[#950000]/10" />

                  <span className="relative flex h-5 w-5 md:h-7 md:w-7 items-center justify-center rounded-full border border-white/35 bg-black/80 text-[8px] md:text-[10px] font-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.65)] transition duration-300 group-hover:bg-[#950000] group-hover:border-white group-hover:scale-110">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <span className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 translate-y-2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-3.5 py-1.5 text-[11px] font-black tracking-[0.08em] text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#950000]" />
                    {spot.name}
                  </span>
                </button>
              ))}

              {active && (
                <div className="hidden md:flex absolute inset-0 z-30 items-center justify-center p-8 pointer-events-none">
                  <PartDetailCard
                    active={active}
                    activeIndex={activeHotspot ?? 0}
                    parts={t.vehicle.hotspots}
                    onClose={() => setActiveHotspot(null)}
                    onSelect={handleSelectPart}
                    className="relative w-full max-w-6xl min-h-[70%] overflow-visible rounded-[40px] border border-white/15 bg-black/90 backdrop-blur-2xl p-12 shadow-[0_40px_140px_rgba(0,0,0,0.95)] pointer-events-auto"
                  />
                </div>
              )}
            </div>
          </div>

          {active && (
            <div id="mobile-part-detail" className="md:hidden scroll-mt-24">
              <PartDetailCard
                active={active}
                activeIndex={activeHotspot ?? 0}
                parts={t.vehicle.hotspots}
                onClose={() => setActiveHotspot(null)}
                onSelect={handleSelectPart}
                className="relative mt-5 rounded-[30px] border border-white/15 bg-gradient-to-b from-zinc-950 to-black p-6 shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
              />
            </div>
          )}
        </div>
      </section>

      <section id="technology" className="py-20 md:py-24 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.35em] font-black text-[#950000] uppercase">
              {t.tech.label}
            </p>
            <h2 className="mt-4 text-3xl md:text-6xl font-black leading-tight break-keep">
              {t.tech.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {t.tech.items.map((item, idx) => {
              const Icon = techIcons[idx];
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[28px] border border-white/[0.18] bg-gradient-to-b from-zinc-900/95 via-zinc-950 to-black p-6 md:p-7 shadow-[0_18px_60px_rgba(0,0,0,0.65)] transition duration-300 hover:-translate-y-2 hover:border-[#950000]/70"
                >
                  {/* 카드 상단 얇은 하이라이트 */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  {/* 은은한 내부 글로우 */}
                  <div className="absolute -right-14 -top-14 w-36 h-36 rounded-full bg-[#950000]/10 blur-3xl opacity-80 md:opacity-0 md:group-hover:opacity-100 transition" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.07] border border-white/[0.18] flex items-center justify-center mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] group-hover:bg-[#950000]/25 group-hover:border-[#950000]/60 transition">
                      <Icon size={24} className="text-white" />
                    </div>

                    <h3 className="text-xl font-black text-white">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm text-gray-300/90 leading-relaxed break-keep">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="direction" className="py-20 md:py-24 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="rounded-[32px] md:rounded-[36px] overflow-hidden border border-white/10 bg-zinc-950 min-h-[420px] relative">
              <img
                src={DIRECTION_IMAGE_SRC}
                alt="CHALLENGER development"
                className="absolute inset-0 w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute left-7 bottom-7 right-7 md:left-8 md:bottom-8 md:right-8">
                <p className="text-xs tracking-[0.35em] font-black text-[#950000] uppercase">
                  {t.direction.label}
                </p>
                <h2 className="mt-3 text-4xl md:text-5xl font-black">
                  {t.direction.title}
                </h2>
              </div>
            </div>

            <div className="rounded-[32px] md:rounded-[36px] border border-white/10 bg-gradient-to-b from-zinc-950 to-black p-7 md:p-12">
              <p className="text-lg md:text-xl text-gray-300 leading-loose break-keep">
                {t.direction.desc}
              </p>

              <div className="mt-10 space-y-4">
                {t.direction.items.map((item, idx) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#950000] flex items-center justify-center shrink-0 text-xs font-black">
                      {idx + 1}
                    </div>
                    <p className="text-gray-200 font-bold leading-relaxed break-keep">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href="/gallery"
                className="mt-10 inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition font-black"
              >
                View Gallery
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="partner" className="py-20 md:py-24 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="relative rounded-[36px] md:rounded-[44px] overflow-hidden bg-zinc-950 p-7 md:p-14 shadow-[0_40px_120px_rgba(0,0,0,0.72)]">
            <div className="absolute inset-0 opacity-[0.14]">
              <img
                src="/awards/2025-gold.jpg"
                alt="CHALLENGER award"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/65" />
            <div className="absolute -right-28 -top-28 w-[520px] h-[520px] rounded-full bg-[#950000]/18 blur-[130px]" />
            <div className="absolute -left-24 -bottom-32 w-[420px] h-[420px] rounded-full bg-white/[0.04] blur-[120px]" />

            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/10 mb-8">
                <Trophy size={16} className="text-[#950000]" />
                <span className="text-xs font-black tracking-[0.3em] text-white/85">
                  {t.sponsor.label}
                </span>
              </div>

              <h2 className="text-3xl md:text-6xl font-black leading-tight break-keep">
                {t.sponsor.title}
              </h2>
              <p className="mt-6 text-lg md:text-xl text-gray-200 leading-loose break-keep">
                {t.sponsor.desc}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="/Challenger_Sponsorship_Proposal.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-black hover:bg-zinc-200 transition"
                >
                  <Download size={18} />
                  {t.sponsor.proposal}
                </a>

                <Link
                  href="/sponsors#join"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur font-black hover:bg-white/10 transition"
                >
                  <Mail size={18} />
                  {t.sponsor.contact}
                </Link>

                <a
                  href="https://instagram.com/challenger_fsae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur font-black hover:bg-white/10 transition"
                >
                  <Instagram size={18} />
                  {t.sponsor.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <img
              src="/logo.png"
              alt="CHALLENGER Logo"
              className="h-12 w-auto object-contain mb-5"
            />
            <p className="text-sm text-gray-500">
              Formula Student Team CHALLENGER
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Hoseo University · Since 1997
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:CHALLENGERFSAE@gmail.com"
              className="p-3 rounded-full bg-zinc-900 hover:bg-[#950000] transition"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://instagram.com/challenger_fsae"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-zinc-900 hover:bg-[#950000] transition"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://youtube.com/@CHALLENGERHOSEO"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-zinc-900 hover:bg-[#950000] transition"
              aria-label="Youtube"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
