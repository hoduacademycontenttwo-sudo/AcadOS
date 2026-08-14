import React from "react";
import {
  Search,
  Smartphone,
  Database,
  FileText,
  Trophy,
  BarChart3,
} from "lucide-react";

export default function Loader() {
  const modules = [
    { name: "Learners Hub", icon: Search },
    { name: "OMR Evaluation", icon: Smartphone },
    { name: "School ERP", icon: Database },
    { name: "TestMaker Engine", icon: FileText },
    { name: "CBT Simulator", icon: Trophy },
    { name: "Admissions CRM", icon: BarChart3 },
  ];

  // duplicate the items so the animation loops seamlessly
  const flowingModules = [...modules, ...modules];

  return (
    <>
      <style>{`
        .acad-loader-wrap {
          --main-size: clamp(5em, 12vw, 9em);
          --text-color: #800000;
          --shine-color: #80000040;
          --shadow-color: #aaaaaa;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          user-select: none;
          position: relative;

          font-size: var(--main-size);
          font-weight: 900;
          text-transform: uppercase;
          color: var(--text-color);

          width: 7.3em;

          /* IMPORTANT:
             give space for modules under the line */
          height: 2.1em;

          /* Don't clip the module flow */
          overflow: visible;

          filter: drop-shadow(
            0 0 0.05em var(--shine-color)
          );

          font-family:
            "Bricolage Grotesque",
            Arial,
            sans-serif;
        }

        /* -------------------------------
           ACADOS TEXT
        -------------------------------- */

        .acad-text-area {
          position: relative;
          width: 100%;
          height: 0.72em;

          display: flex;
          justify-content: center;
          align-items: center;

          overflow: hidden;
        }

        .acad-loader-wrap .text {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          position: absolute;
        }

        .acad-loader-wrap .text:nth-child(1) {
          clip-path: polygon(
            0% 0%,
            11.11% 0%,
            11.11% 100%,
            0% 100%
          );
          font-size: calc(var(--main-size) / 20);
          margin-left: -2.1em;
          opacity: 0.6;
        }

        .acad-loader-wrap .text:nth-child(2) {
          clip-path: polygon(
            11.11% 0%,
            22.22% 0%,
            22.22% 100%,
            11.11% 100%
          );
          font-size: calc(var(--main-size) / 16);
          margin-left: -0.98em;
          opacity: 0.7;
        }

        .acad-loader-wrap .text:nth-child(3) {
          clip-path: polygon(
            22.22% 0%,
            33.33% 0%,
            33.33% 100%,
            22.22% 100%
          );
          font-size: calc(var(--main-size) / 13);
          margin-left: -0.33em;
          opacity: 0.8;
        }

        .acad-loader-wrap .text:nth-child(4) {
          clip-path: polygon(
            33.33% 0%,
            44.44% 0%,
            44.44% 100%,
            33.33% 100%
          );
          font-size: calc(var(--main-size) / 11);
          margin-left: -0.05em;
          opacity: 0.9;
        }

        .acad-loader-wrap .text:nth-child(5) {
          clip-path: polygon(
            44.44% 0%,
            55.55% 0%,
            55.55% 100%,
            44.44% 100%
          );
          font-size: calc(var(--main-size) / 10);
          margin-left: 0;
          opacity: 1;
        }

        .acad-loader-wrap .text:nth-child(6) {
          clip-path: polygon(
            55.55% 0%,
            66.66% 0%,
            66.66% 100%,
            55.55% 100%
          );
          font-size: calc(var(--main-size) / 11);
          margin-left: 0.05em;
          opacity: 0.9;
        }

        .acad-loader-wrap .text:nth-child(7) {
          clip-path: polygon(
            66.66% 0%,
            77.77% 0%,
            77.77% 100%,
            66.66% 100%
          );
          font-size: calc(var(--main-size) / 13);
          margin-left: 0.33em;
          opacity: 0.8;
        }

        .acad-loader-wrap .text:nth-child(8) {
          clip-path: polygon(
            77.77% 0%,
            88.88% 0%,
            88.88% 100%,
            77.77% 100%
          );
          font-size: calc(var(--main-size) / 16);
          margin-left: 0.98em;
          opacity: 0.7;
        }

        .acad-loader-wrap .text:nth-child(9) {
          clip-path: polygon(
            88.88% 0%,
            100% 0%,
            100% 100%,
            88.88% 100%
          );
          font-size: calc(var(--main-size) / 20);
          margin-left: 2.1em;
          opacity: 0.6;
        }

        .acad-loader-wrap .text span {
          animation:
            acad-scrolling 2s
              cubic-bezier(0.1, 0.6, 0.9, 0.4)
              infinite,
            acad-shadow 2s
              cubic-bezier(0.1, 0.6, 0.9, 0.4)
              infinite;
        }

        .acad-loader-wrap .text:nth-child(1) span {
          background: linear-gradient(
            to right,
            var(--text-color) 4%,
            var(--shadow-color) 7%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .acad-loader-wrap .text:nth-child(2) span {
          background: linear-gradient(
            to right,
            var(--text-color) 9%,
            var(--shadow-color) 13%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .acad-loader-wrap .text:nth-child(3) span {
          background: linear-gradient(
            to right,
            var(--text-color) 15%,
            var(--shadow-color) 18%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .acad-loader-wrap .text:nth-child(4) span {
          background: linear-gradient(
            to right,
            var(--text-color) 20%,
            var(--shadow-color) 23%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .acad-loader-wrap .text:nth-child(6) span {
          background: linear-gradient(
            to right,
            var(--shadow-color) 29%,
            var(--text-color) 32%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .acad-loader-wrap .text:nth-child(7) span {
          background: linear-gradient(
            to right,
            var(--shadow-color) 34%,
            var(--text-color) 37%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .acad-loader-wrap .text:nth-child(8) span {
          background: linear-gradient(
            to right,
            var(--shadow-color) 39%,
            var(--text-color) 42%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .acad-loader-wrap .text:nth-child(9) span {
          background: linear-gradient(
            to right,
            var(--shadow-color) 45%,
            var(--text-color) 48%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        /* -------------------------------
           RED LOADING LINE
        -------------------------------- */

        .acad-loader-wrap .line {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;

          height: 0.05em;
          width: calc(var(--main-size) / 2);

          margin-top: 0.04em;

          border-radius: 0.05em;

          flex-shrink: 0;
        }

        .acad-loader-wrap .line::before {
          content: "";
          position: absolute;
          height: 100%;
          width: 100%;

          background-color: var(--text-color);
          opacity: 0.3;
        }

        .acad-loader-wrap .line::after {
          content: "";
          position: absolute;
          height: 100%;
          width: 100%;

          background-color: var(--text-color);

          border-radius: 0.05em;

          transform: translateX(-90%);

          animation: acad-wobble 2s
            cubic-bezier(0.5, 0.8, 0.5, 0.2)
            infinite;
        }

        /* -------------------------------
           MODULE FLOW
        -------------------------------- */

        .acad-module-window {
          /* override huge parent font size */
          font-size: 16px;

          position: relative;

          width: min(720px, 88vw);
          height: 92px;

          margin-top: 22px;

          overflow: hidden;

          /* soft fade at left and right */
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );

          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .acad-module-track {
          display: flex;
          align-items: center;

          width: max-content;

          gap: 18px;

          animation: module-flow 16s linear infinite;
        }

        .acad-module {
          width: 115px;
          height: 78px;

          flex-shrink: 0;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 7px;

          color: #1e3a5f;

          text-transform: none;
          font-weight: 500;
        }

        .acad-module-icon {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 13px;

          background: rgba(255, 255, 255, 0.95);

          border: 1px solid #e2e8f0;

          box-shadow:
            0 4px 12px rgba(15, 23, 42, 0.12),
            0 0 0 2px rgba(128, 0, 0, 0.03);

          color: #9b111e;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .acad-module-icon svg {
          width: 20px;
          height: 20px;
          stroke-width: 1.8;
        }

        .acad-module-name {
          font-size: 10px;

          text-align: center;
          line-height: 1.15;

          white-space: nowrap;

          color: #405674;
        }

        /* Highlight TestMaker like your screenshot */
        .acad-module.testmaker .acad-module-icon {
          background: #800000;
          color: #f5c46b;

          box-shadow:
            0 5px 14px rgba(128, 0, 0, 0.24),
            0 0 0 3px rgba(128, 0, 0, 0.08);
        }

        .acad-module.testmaker .acad-module-name {
          color: #800000;
          font-weight: 700;
        }

        /* -------------------------------
           ANIMATIONS
        -------------------------------- */

        @keyframes module-flow {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 9px));
          }
        }

        @keyframes acad-wobble {
          0% {
            transform: translateX(-90%);
          }

          50% {
            transform: translateX(90%);
          }

          100% {
            transform: translateX(-90%);
          }
        }

        @keyframes acad-scrolling {
          0% {
            transform: translateX(-100%);
          }

          100% {
            transform: translateX(100%);
          }
        }

        @keyframes acad-shadow {
          0% {
            background-position: -98% 0;
          }

          100% {
            background-position: 102% 0;
          }
        }

        @media (max-width: 640px) {
          .acad-module-window {
            width: 92vw;
          }

          .acad-module {
            width: 95px;
          }

          .acad-module-track {
            gap: 10px;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50">
        <div className="acad-loader-wrap">
          {/* AcadOS */}
          <div className="acad-text-area">
            {[
              "AcadOS",
              "AcadOS",
              "AcadOS",
              "AcadOS",
              "AcadOS",
              "AcadOS",
              "AcadOS",
              "AcadOS",
              "AcadOS",
            ].map((text, index) => (
              <div key={index} className="text">
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* animated red line */}
          <div className="line" />

          {/* Modules flowing below the line */}
          <div className="acad-module-window">
            <div className="acad-module-track">
              {flowingModules.map((module, index) => {
                const Icon = module.icon;

                return (
                  <div
                    key={`${module.name}-${index}`}
                    className={`acad-module ${
                      module.name === "TestMaker Engine"
                        ? "testmaker"
                        : ""
                    }`}
                  >
                    <div className="acad-module-icon">
                      <Icon />
                    </div>

                    <div className="acad-module-name">
                      {module.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
