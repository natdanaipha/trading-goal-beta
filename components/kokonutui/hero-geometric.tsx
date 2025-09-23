"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function HeroGeometric({
  badge = "",
  title1 = "",
  title2 = "",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const saved = localStorage.getItem("trading-checkboxes")
    if (saved) {
      setCheckedStates(JSON.parse(saved))
    }
  }, [])

  const handleCheckboxChange = (rowId: string, multiplier: string) => {
    const key = `${rowId}-${multiplier}`
    const newStates = {
      ...checkedStates,
      [key]: !checkedStates[key],
    }
    setCheckedStates(newStates)
    localStorage.setItem("trading-checkboxes", JSON.stringify(newStates))
  }

  const calculateWin = (rowId: string, cost: number) => {
    const multipliers = ["1", "2", "3", "4", "5"]
    let total = 0
    multipliers.forEach((mult) => {
      const key = `${rowId}-${mult}`
      if (checkedStates[key]) {
        total += Number.parseInt(mult)
      }
    })
    return cost * total
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Image
                src="/images/banana-logo.png"
                alt="Banana Trading Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
                Banana Trading
              </h1>
            </div>
          </motion.div>

          {badge && (
            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
            >
              <Image src="https://kokonutui.com/logo.svg" alt="Kokonut UI" width={20} height={20} />
              <span className="text-sm text-white/60 tracking-wide">{badge}</span>
            </motion.div>
          )}

          {(title1 || title2) && (
            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                {title1 && (
                  <>
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                      {title1}
                    </span>
                    <br />
                  </>
                )}
                {title2 && (
                  <span
                    className={cn(
                      "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 ",
                      pacifico.className,
                    )}
                  >
                    {title2}
                  </span>
                )}
              </h1>
            </motion.div>
          )}

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="bg-black/40 border border-white/20 rounded-lg backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-white/80 font-medium p-3 text-left">no</th>
                        <th className="text-white/80 font-medium p-3 text-left">cost</th>
                        <th className="text-white/80 font-medium p-3 text-center">1x</th>
                        <th className="text-white/80 font-medium p-3 text-center">2x</th>
                        <th className="text-white/80 font-medium p-3 text-center">3x</th>
                        <th className="text-white/80 font-medium p-3 text-center">4x</th>
                        <th className="text-white/80 font-medium p-3 text-center">5x</th>
                        <th className="text-white/80 font-medium p-3 text-left">win</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="text-white p-3">1</td>
                        <td className="text-white p-3">50</td>
                        {["1", "2", "3", "4", "5"].map((mult) => (
                          <td key={mult} className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={checkedStates[`1-${mult}`] || false}
                              onChange={() => handleCheckboxChange("1", mult)}
                              className={cn(
                                "w-4 h-4 rounded border-white/20 focus:ring-2 focus:ring-yellow-400",
                                checkedStates[`1-${mult}`]
                                  ? "bg-yellow-400 border-yellow-400"
                                  : "bg-transparent border-white/20",
                              )}
                            />
                          </td>
                        ))}
                        <td className="text-white p-3">{calculateWin("1", 50)}</td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="text-white p-3">2</td>
                        <td className="text-white p-3">50</td>
                        {["1", "2", "3", "4", "5"].map((mult) => (
                          <td key={mult} className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={checkedStates[`2-${mult}`] || false}
                              onChange={() => handleCheckboxChange("2", mult)}
                              className={cn(
                                "w-4 h-4 rounded border-white/20 focus:ring-2 focus:ring-yellow-400",
                                checkedStates[`2-${mult}`]
                                  ? "bg-yellow-400 border-yellow-400"
                                  : "bg-transparent border-white/20",
                              )}
                            />
                          </td>
                        ))}
                        <td className="text-white p-3">{calculateWin("2", 50)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
              <motion.div
                custom={2.1}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="bg-black/40 border border-white/20 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="mb-2 flex justify-center">
                  <Image src="/images/usdjpy.png" alt="USDJPY" width={40} height={40} className="rounded-full" />
                </div>
                <div className="text-white text-sm font-medium">USDJPY</div>
              </motion.div>

              <motion.div
                custom={2.2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="bg-black/40 border border-white/20 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="mb-2 flex justify-center">
                  <Image src="/images/eurusd.png" alt="EURUSD" width={32} height={32} className="rounded-full" />
                </div>
                <div className="text-white text-sm font-medium">EURUSD</div>
              </motion.div>

              <motion.div
                custom={2.3}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="bg-black/40 border border-white/20 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="mb-2 flex justify-center">
                  <Image src="/images/usdchf-new.png" alt="USDCHF" width={40} height={40} className="rounded-full" />
                </div>
                <div className="text-white text-sm font-medium">USDCHF</div>
              </motion.div>

              <motion.div
                custom={2.4}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="bg-black/40 border border-white/20 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="mb-2 flex justify-center">
                  <Image src="/images/eurjpy.png" alt="EURJPY" width={40} height={40} className="rounded-full" />
                </div>
                <div className="text-white text-sm font-medium">EURJPY</div>
              </motion.div>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Trading Guidelines
              <br />
              Don't overtrade, identify the market condition: trending or sideway.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}
