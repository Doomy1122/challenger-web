"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import {
  Activity,
  ArrowRight,
  BatteryCharging,
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
  ShieldCheck,
  Sparkles,
  Thermometer,
  Trophy,
  X,
  Youtube,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

const VEHICLE_IMAGE_SRC = "/gallery/df-25/KakaoTalk_20260629_1735219801.jpg";
const VEHICLE_IMAGE_ASPECT = "4 / 3.8";
const DIRECTION_IMAGE_SRC = "/gallery/df-26/KakaoTalk_20260423_213900869.jpg";

const copy = {
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
      { value: "1ST", label: "2025 Acceleration Award" },
      { value: "3.598s", label: "0–75 m Acceleration" },
      { value: "84.83", label: "Endurance Score" },
    ],
    vehicle: {
      label: "Interactive Vehicle",
      title: "차량을 클릭해 CHALLENGER의 파트를 확인하세요.",
      desc: "CHALLENGER의 차량은 프레임, 서스펜션, 구동계, 전장, 공력, 냉각, 제어가 하나의 시스템으로 연결되어 완성됩니다.",
      hint: "파트 마커를 눌러보세요",
      hotspots: [
        {
          name: "Suspension",
          x: "44%",
          y: "66%",
          title: "Suspension",
          desc: "노면 입력을 차량 거동으로 연결하는 파트입니다. 타이어 접지력, 롤 거동, 조향 응답성을 고려해 차량의 기본 움직임을 설계합니다.",
          points: [
            {
              title: "Vehicle Dynamics Tuning",
              desc: "코너링, 제동, 가속 상황에서 타이어가 안정적으로 접지력을 발휘하도록 지오메트리와 세팅을 조정합니다.",
            },
            {
              title: "Load Transfer Control",
              desc: "차량의 하중 이동을 분석해 롤, 피치, 조향 응답성을 균형 있게 설계합니다.",
            },
          ],
        },
        {
          name: "Frame",
          x: "36%",
          y: "56%",
          title: "Frame",
          desc: "차량의 모든 시스템을 지지하는 구조 파트입니다. 강성, 경량화, 패키징, 안전성을 동시에 고려해 차량의 기반을 설계합니다.",
          points: [
            {
              title: "Lightweight Structure",
              desc: "차량의 무게를 줄이면서도 주행 중 발생하는 하중을 견딜 수 있도록 프레임 구조를 설계합니다.",
            },
            {
              title: "System Packaging",
              desc: "배터리, 구동계, 서스펜션, 드라이버 공간이 충돌하지 않도록 전체 차량 패키징의 기준을 잡습니다.",
            },
          ],
        },
        {
          name: "Ergonomics",
          x: "43%",
          y: "49%",
          title: "Ergonomics",
          desc: "드라이버가 차량을 정확하고 안정적으로 조작할 수 있도록 시야, 자세, 페달, 스티어링, 조작계를 설계하는 파트입니다.",
          points: [
            {
              title: "Driver Position Optimization",
              desc: "드라이버의 착좌 자세, 시야, 조작 범위를 고려해 차량과 드라이버가 하나의 시스템처럼 반응하도록 설계합니다.",
            },
            {
              title: "Pedal & Steering Interface",
              desc: "페달, 스티어링, 조작계 배치를 최적화해 주행 중 입력 실수를 줄이고 조작 일관성을 높입니다.",
            },
          ],
        },
        {
          name: "Drive Train",
          x: "25%",
          y: "70%",
          title: "Drive Train",
          desc: "모터의 출력을 바퀴까지 전달하는 구동계 파트입니다. 감속비, 체인/스프로킷, 디퍼렌셜, 출력 전달 효율을 다룹니다.",
          points: [
            {
              title: "Torque Delivery",
              desc: "모터에서 발생한 토크가 손실 없이 타이어까지 전달되도록 감속비와 동력 전달 구조를 설계합니다.",
            },
            {
              title: "Reliability Under Load",
              desc: "가속, 제동, 코너 탈출 상황에서 반복적으로 걸리는 충격 하중을 견딜 수 있도록 구동계를 검증합니다.",
            },
          ],
        },
        {
          name: "Cooling",
          x: "32%",
          y: "75%",
          title: "Cooling",
          desc: "모터와 인버터의 열을 관리해 차량이 성능을 오래 유지할 수 있도록 냉각 시스템을 설계하는 파트입니다.",
          points: [
            {
              title: "Thermal Stability",
              desc: "주행 중 모터와 인버터 온도를 안정적으로 유지해 출력 저하를 줄이고 내구 주행 성능을 확보합니다.",
            },
            {
              title: "Cooling Control Logic",
              desc: "온도 데이터를 기반으로 팬과 펌프를 제어해 필요한 순간에 필요한 만큼 냉각합니다.",
            },
          ],
        },
        {
          name: "Aero",
          x: "84%",
          y: "80%",
          title: "Aero",
          desc: "공기 흐름을 이용해 차량의 접지력과 고속 안정성을 높이는 파트입니다. 다운포스와 항력의 균형을 설계합니다.",
          points: [
            {
              title: "Downforce Generation",
              desc: "윙과 바디워크를 통해 타이어 접지력을 높이고 코너링 성능 향상에 기여합니다.",
            },
            {
              title: "Drag Balance",
              desc: "다운포스 증가와 항력 증가 사이의 균형을 고려해 실제 주행에서 이득이 되는 공력 패키지를 설계합니다.",
            },
          ],
        },
        {
          name: "Motor Control",
          x: "50%",
          y: "57%",
          title: "Motor Control",
          desc: "모터, 인버터, 페달 입력, 배터리 제한을 기반으로 차량의 토크 명령을 결정하는 파트입니다.",
          points: [
            {
              title: "Torque Command Strategy",
              desc: "드라이버 입력, 배터리 제한, 인버터 상태를 반영해 차량이 사용할 수 있는 토크를 실시간으로 결정합니다.",
            },
            {
              title: "Regenerative Braking Logic",
              desc: "회생제동을 단순 감속이 아니라 내구 주행 에너지 전략의 일부로 설계합니다.",
            },
          ],
        },
        {
          name: "HV",
          x: "37%",
          y: "67%",
          title: "HV",
          desc: "고전압 배터리, 전장 안전, 전력 분배를 담당하는 파트입니다. 차량의 출력과 안전을 동시에 관리합니다.",
          points: [
            {
              title: "High Voltage Safety",
              desc: "고전압 시스템의 절연, 차단, 보호 회로를 설계해 차량과 드라이버의 안전을 확보합니다.",
            },
            {
              title: "Power Distribution",
              desc: "배터리에서 인버터까지 안정적으로 전력을 전달하고, 전류 제한과 보호 조건을 관리합니다.",
            },
          ],
        },
        {
          name: "LV",
          x: "55%",
          y: "52%",
          title: "LV",
          desc: "센서, 제어기, 통신, 전원 시스템을 구성하는 저전압 파트입니다. 차량의 데이터와 제어 신호가 안정적으로 흐르도록 설계합니다.",
          points: [
            {
              title: "Vehicle Signal Network",
              desc: "센서, VCU, BMS, 인버터 간의 신호와 CAN 통신을 구성해 차량 상태를 안정적으로 전달합니다.",
            },
            {
              title: "Fail-Safe Electronics",
              desc: "전원, 통신, 센서 이상 상황에서도 차량이 안전한 상태로 전환될 수 있도록 전장 시스템을 설계합니다.",
            },
          ],
        },
      ],
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
          desc: "APPS, BPS, 인버터, BMS 데이터를 통합해 토크 명령을 결정합니다.",
        },
        {
          title: "Regen Strategy",
          desc: "회생제동을 에너지 회수와 차량 안정성의 균형점에서 설계합니다.",
        },
        {
          title: "Thermal Control",
          desc: "모터와 인버터 온도 데이터를 기반으로 냉각 로직을 구성합니다.",
        },
        {
          title: "Wireless Data",
          desc: "100 Hz급 무선 데이터 수집을 목표로 실시간 차량 상태를 추적합니다.",
        },
        {
          title: "Limit Tuning",
          desc: "차량 한계를 정량화하고, 그 한계까지 사용할 수 있도록 세팅합니다.",
        },
      ],
    },
    direction: {
      label: "2026 Direction",
      title: "COOPERATIVE CONTROL",
      desc: "2026 CHALLENGER는 모터 제어, 냉각, 무선 데이터, 공력 장치를 하나의 차량 제어 전략으로 연결하는 것을 목표로 합니다.",
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
      desc: "CHALLENGER proves the limits of an electric formula vehicle through data and control.",
      primary: "Explore Parts",
      secondary: "Sponsor Partnership",
    },
    stats: [
      { value: "GOLD", label: "2025 FSK E-Formula" },
      { value: "1ST", label: "2025 Acceleration Award" },
      { value: "3.598s", label: "0–75 m Acceleration" },
      { value: "84.83", label: "Endurance Score" },
    ],
    vehicle: {
      label: "Interactive Vehicle",
      title: "Click the vehicle to explore CHALLENGER parts.",
      desc: "CHALLENGER is completed by connecting frame, suspension, drivetrain, electronics, aero, cooling, and control as one system.",
      hint: "Tap the part markers",
      hotspots: [
        {
          name: "Suspension",
          x: "44%",
          y: "66%",
          title: "Suspension",
          desc: "The suspension connects road input to vehicle behavior. It defines the car's fundamental response through tire grip, roll behavior, and steering response.",
          points: [
            {
              title: "Vehicle Dynamics Tuning",
              desc: "We tune geometry and setup so the tires can generate stable grip during cornering, braking, and acceleration.",
            },
            {
              title: "Load Transfer Control",
              desc: "We analyze load transfer to balance roll, pitch, and steering response.",
            },
          ],
        },
        {
          name: "Frame",
          x: "36%",
          y: "56%",
          title: "Frame",
          desc: "The frame supports every system of the vehicle. It balances stiffness, lightweight design, packaging, and safety.",
          points: [
            {
              title: "Lightweight Structure",
              desc: "We design the frame to reduce mass while withstanding loads generated during driving.",
            },
            {
              title: "System Packaging",
              desc: "The frame defines how the battery, drivetrain, suspension, and driver space coexist inside the vehicle.",
            },
          ],
        },
        {
          name: "Ergonomics",
          x: "43%",
          y: "49%",
          title: "Ergonomics",
          desc: "Ergonomics helps the driver control the vehicle precisely and safely through visibility, posture, pedals, steering, and controls.",
          points: [
            {
              title: "Driver Position Optimization",
              desc: "We consider driver posture, sightline, and operating range so the driver and vehicle respond as one system.",
            },
            {
              title: "Pedal & Steering Interface",
              desc: "We optimize pedal, steering, and control layout to reduce input mistakes and improve consistency.",
            },
          ],
        },
        {
          name: "Drive Train",
          x: "25%",
          y: "70%",
          title: "Drive Train",
          desc: "The drivetrain transfers motor output to the wheels, covering gear ratio, chain and sprocket systems, differential behavior, and power delivery efficiency.",
          points: [
            {
              title: "Torque Delivery",
              desc: "We design the reduction and power delivery structure so motor torque reaches the tires with minimal loss.",
            },
            {
              title: "Reliability Under Load",
              desc: "We validate the drivetrain against repeated impact loads during acceleration, braking, and corner exit.",
            },
          ],
        },
        {
          name: "Cooling",
          x: "32%",
          y: "75%",
          title: "Cooling",
          desc: "The cooling system manages motor and inverter heat so the vehicle can maintain performance over time.",
          points: [
            {
              title: "Thermal Stability",
              desc: "We stabilize motor and inverter temperature to reduce power derating and secure endurance performance.",
            },
            {
              title: "Cooling Control Logic",
              desc: "We control fans and pumps based on temperature data to cool only when and where it is needed.",
            },
          ],
        },
        {
          name: "Aero",
          x: "84%",
          y: "80%",
          title: "Aero",
          desc: "Aero uses airflow to improve grip and high-speed stability by balancing downforce and drag.",
          points: [
            {
              title: "Downforce Generation",
              desc: "Wings and bodywork increase tire grip and contribute to cornering performance.",
            },
            {
              title: "Drag Balance",
              desc: "We balance downforce gain and drag penalty to create an aero package that works in real driving.",
            },
          ],
        },
        {
          name: "Motor Control",
          x: "50%",
          y: "57%",
          title: "Motor Control",
          desc: "Motor control determines torque commands based on motor, inverter, pedal input, and battery limits.",
          points: [
            {
              title: "Torque Command Strategy",
              desc: "We determine available torque in real time based on driver input, battery limits, and inverter state.",
            },
            {
              title: "Regenerative Braking Logic",
              desc: "Regenerative braking is designed not only for deceleration, but also as part of the endurance energy strategy.",
            },
          ],
        },
        {
          name: "HV",
          x: "37%",
          y: "67%",
          title: "HV",
          desc: "The high-voltage system manages the battery, electrical safety, and power distribution for both performance and safety.",
          points: [
            {
              title: "High Voltage Safety",
              desc: "We design insulation, shutdown, and protection circuits to secure both vehicle and driver safety.",
            },
            {
              title: "Power Distribution",
              desc: "We deliver power from the battery to the inverter while managing current limits and protection conditions.",
            },
          ],
        },
        {
          name: "LV",
          x: "55%",
          y: "52%",
          title: "LV",
          desc: "The low-voltage system handles sensors, controllers, communication, and power electronics for stable data and control signals.",
          points: [
            {
              title: "Vehicle Signal Network",
              desc: "We build the signal and CAN communication network between sensors, VCU, BMS, and inverter.",
            },
            {
              title: "Fail-Safe Electronics",
              desc: "We design electronics so the vehicle can transition to a safe state during power, communication, or sensor faults.",
            },
          ],
        },
      ],
    },
    philosophy: {
      label: "Why CHALLENGER",
      title: "WE DO NOT GUESS THE LIMIT.",
      desc: "CHALLENGER does not tune the vehicle by instinct. We measure the limits through driving data, control logic, and power system analysis, then use the vehicle up to those limits.",
      cards: [
        {
          title: "CONTROL",
          desc: "We design vehicle commands from a control-oriented perspective.",
        },
        {
          title: "DATA",
          desc: "We leave evidence behind every vehicle setup decision.",
        },
        {
          title: "ENERGY",
          desc: "We build power strategies that survive endurance.",
        },
      ],
    },
    tech: {
      label: "Technology Stack",
      title: "We connect the vehicle as one system.",
      items: [
        {
          title: "VCU Control",
          desc: "Torque commands are determined by integrating APPS, BPS, inverter, and BMS data.",
        },
        {
          title: "Regen Strategy",
          desc: "Regenerative braking is designed at the balance point between energy recovery and vehicle stability.",
        },
        {
          title: "Thermal Control",
          desc: "Cooling logic is built from motor and inverter temperature data.",
        },
        {
          title: "Wireless Data",
          desc: "We target 100 Hz wireless data acquisition to track real-time vehicle states.",
        },
        {
          title: "Limit Tuning",
          desc: "We quantify vehicle limits and tune the car to use them.",
        },
      ],
    },
    direction: {
      label: "2026 Direction",
      title: "COOPERATIVE CONTROL",
      desc: "For 2026, CHALLENGER aims to connect motor control, cooling, wireless data, and aerodynamic devices into one vehicle control strategy.",
      items: [
        "Performance optimization through motor control",
        "Endurance strategy through regenerative braking",
        "Cooperative cooling / power / torque control",
        "Limit-based tuning through driving data",
      ],
    },
    sponsor: {
      label: "Partner With CHALLENGER",
      title: "Sponsorship becomes more than logo exposure. It becomes a record of engineering growth.",
      desc: "CHALLENGER partners leave their name in the process where student engineers design, build, and validate a real electric formula vehicle.",
      proposal: "Download Proposal",
      contact: "Contact Team",
      instagram: "Instagram",
    },
  },
} as const;

const techIcons = [Cpu, RefreshCw, Thermometer, RadioTower, Gauge];
const philosophyIcons = [ShieldCheck, Activity, BatteryCharging];

export default function GaragePage() {
  const { language, toggleLanguage } = useLanguage();
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const t = copy[language];
  const active =
    activeHotspot !== null ? t.vehicle.hotspots[activeHotspot] : null;

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
              {language === "ko" ? "ENG" : "KOR"}
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
            alt="CHALLENGER DF-26"
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-white/40 font-black">
          SCROLL
        </div>
      </section>

      <section className="relative z-10 -mt-14 md:-mt-20 pb-16 md:pb-20">
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

      <section id="vehicle" className="py-20 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8">
            <p className="text-xs tracking-[0.35em] font-black text-[#950000] uppercase">
              {t.vehicle.label}
            </p>

            <h2 className="mt-4 text-3xl md:text-6xl font-black leading-tight break-keep">
              {t.vehicle.title}
            </h2>

            <p className="mt-4 text-gray-400 text-base md:text-lg leading-relaxed break-keep">
              {t.vehicle.desc}
            </p>
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
                  active ? "blur-sm scale-105 opacity-55" : "opacity-95"
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/30" />

              {active && (
                <button
                  aria-label="Close popup"
                  onClick={() => setActiveHotspot(null)}
                  className="absolute inset-0 z-20 bg-black/45 backdrop-blur-[2px]"
                />
              )}

              {!active && (
                <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between gap-4">
                  <div className="rounded-full border border-white/10 bg-black/60 backdrop-blur px-4 py-2 text-[10px] md:text-xs font-black tracking-[0.18em] text-white/75">
                    {t.vehicle.hint}
                  </div>

                  <div className="hidden md:block rounded-full border border-[#950000]/40 bg-[#950000]/20 px-4 py-2 text-xs font-black tracking-[0.18em] text-white">
                    DIGITAL GARAGE
                  </div>
                </div>
              )}

              {t.vehicle.hotspots.map((spot, idx) => (
                <button
                  key={spot.name}
                  onClick={() => setActiveHotspot(idx)}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 group ${
                    active ? "pointer-events-none opacity-20" : "opacity-100"
                  }`}
                  style={{ left: spot.x, top: spot.y }}
                  aria-label={spot.name}
                >
                  <span className="absolute -inset-4 rounded-full" />

                  <span className="absolute left-1/2 top-1/2 w-8 h-8 md:w-10 md:h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-black/20 backdrop-blur-[2px] transition duration-300 group-hover:scale-125 group-hover:border-[#950000]/80 group-hover:bg-[#950000]/10" />

                  <span className="relative flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full border border-white/40 bg-black/75 text-[9px] md:text-[10px] font-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.65)] transition duration-300 group-hover:bg-[#950000] group-hover:border-white group-hover:scale-110">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <span className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 translate-y-2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/80 px-3.5 py-1.5 text-[11px] font-black tracking-[0.08em] text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#950000]" />
                    {spot.name}
                  </span>
                </button>
              ))}

              {!active && (
                <div className="absolute left-0 right-0 bottom-0 z-10 p-4 md:hidden">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {t.vehicle.hotspots.map((spot, idx) => (
                      <button
                        key={spot.name}
                        onClick={() => setActiveHotspot(idx)}
                        className="shrink-0 rounded-full border border-white/15 bg-black/65 backdrop-blur px-4 py-2 text-xs font-black text-white"
                      >
                        {spot.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {active && (
                <div className="absolute inset-0 z-30 flex items-end md:items-center justify-center p-3 md:p-8 pointer-events-none">
                  <div className="relative w-full max-w-6xl min-h-[70%] overflow-visible rounded-[30px] md:rounded-[40px] border border-white/15 bg-black/90 backdrop-blur-2xl p-6 md:p-12 shadow-[0_40px_140px_rgba(0,0,0,0.95)] pointer-events-auto">
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="absolute right-5 top-5 w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-[#950000] transition flex items-center justify-center"
                      aria-label="Close"
                    >
                      <X size={22} />
                    </button>

                    <div className="pr-14">
                      <p className="text-xs font-black tracking-[0.35em] text-[#950000] uppercase">
                        Part {String(activeHotspot! + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
                        {active.title}
                      </h3>
                    </div>

                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 md:gap-10">
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
                        {t.vehicle.hotspots.map((spot, idx) => (
                          <button
                            key={spot.name}
                            onClick={() => setActiveHotspot(idx)}
                            className={`rounded-full border px-4 py-2 text-xs font-black transition ${
                              idx === activeHotspot
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
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="rounded-[32px] md:rounded-[40px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-zinc-950 to-black p-7 md:p-14 overflow-hidden relative">
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#950000]/20 blur-[100px]" />
            <div className="relative z-10">
              <p className="text-xs tracking-[0.35em] font-black text-[#950000] uppercase">
                {t.philosophy.label}
              </p>
              <h2 className="mt-4 text-4xl md:text-7xl font-black leading-tight">
                {t.philosophy.title}
              </h2>
              <p className="mt-6 max-w-4xl text-lg md:text-xl text-gray-300 leading-loose break-keep">
                {t.philosophy.desc}
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
                {t.philosophy.cards.map((card, idx) => {
                  const Icon = philosophyIcons[idx];
                  return (
                    <div
                      key={card.title}
                      className="rounded-3xl border border-white/10 bg-black/40 p-7"
                    >
                      <Icon className="text-[#950000] mb-5" size={28} />
                      <h3 className="text-2xl font-black">{card.title}</h3>
                      <p className="mt-3 text-gray-400 leading-relaxed break-keep">
                        {card.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {t.tech.items.map((item, idx) => {
              const Icon = techIcons[idx];
              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-white/10 bg-zinc-950 p-7 hover:-translate-y-2 hover:border-[#950000]/70 hover:bg-[#950000]/10 transition duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#950000] transition">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-4 text-sm text-gray-400 leading-relaxed break-keep">
                    {item.desc}
                  </p>
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
          <div className="relative rounded-[36px] md:rounded-[44px] overflow-hidden border border-white/10 bg-[#950000] p-7 md:p-14">
            <div className="absolute inset-0 opacity-20">
              <img
                src="/awards/2025-gold.jpg"
                alt="CHALLENGER award"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-[#950000]/70" />

            <div className="relative z-10 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 mb-8">
                <Trophy size={16} />
                <span className="text-xs font-black tracking-[0.3em]">
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
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/25 bg-black/30 backdrop-blur font-black hover:bg-white/10 transition"
                >
                  <Mail size={18} />
                  {t.sponsor.contact}
                </Link>

                <a
                  href="https://instagram.com/challenger_fsae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/25 bg-black/30 backdrop-blur font-black hover:bg-white/10 transition"
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