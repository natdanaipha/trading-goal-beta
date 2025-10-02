"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

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
  const [currentLevels, setCurrentLevels] = useState<{ [key: string]: number }>({})
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem("trading-checkboxes")
    const savedLevels = localStorage.getItem("trading-levels")
    if (saved) {
      setCheckedStates(JSON.parse(saved))
    }
    if (savedLevels) {
      setCurrentLevels(JSON.parse(savedLevels))
    } else {
      setCurrentLevels({ "184": 1, "188": 1 })
    }
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const handleCheckboxChange = (rowId: string, multiplier: string) => {
    const key = `${rowId}-${multiplier}`
    const newStates = {
      ...checkedStates,
      [key]: !checkedStates[key],
    }
    setCheckedStates(newStates)
    localStorage.setItem("trading-checkboxes", JSON.stringify(newStates))

    const multipliers = ["1", "2", "3"]
    const allChecked = multipliers.every((mult) => newStates[`${rowId}-${mult}`])

    if (allChecked) {
      const currentLevel = currentLevels[rowId] || 1
      if (currentLevel < 5) {
        const newLevel = currentLevel + 1
        const newLevels = { ...currentLevels, [rowId]: newLevel }
        setCurrentLevels(newLevels)
        localStorage.setItem("trading-levels", JSON.stringify(newLevels))

        const resetStates = { ...newStates }
        multipliers.forEach((mult) => {
          delete resetStates[`${rowId}-${mult}`]
        })
        setCheckedStates(resetStates)
        localStorage.setItem("trading-checkboxes", JSON.stringify(resetStates))
      }
    }
  }

  const getCurrentLevel = (rowId: string) => {
    return currentLevels[rowId] || 1
  }

  const getCost = (rowId: string) => {
    const level = getCurrentLevel(rowId)
    return level === 1 ? 50 : 200
  }

  const getCheckboxValue = (rowId: string) => {
    const level = getCurrentLevel(rowId)
    return level === 1 ? 50 : 200
  }

  const calculateWin = (rowId: string) => {
    const level = getCurrentLevel(rowId)
    const cost = getCost(rowId)
    const checkboxValue = getCheckboxValue(rowId)

    const multipliers = ["1", "2", "3"]
    let total = 0
    multipliers.forEach((mult) => {
      const key = `${rowId}-${mult}`
      if (checkedStates[key]) {
        total += checkboxValue
      }
    })

    if (level === 1) {
      return total + 50
    } else {
      return total + 200
    }
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

  const currencyPairs = [
    { name: "USDJPY", image: "/images/usdjpy.png", size: 40, msg: "Trending pair, mix of volatility & flow" },
    { name: "EURUSD", image: "/images/eurusd.png", size: 32, msg: "Most traded, tight spreads, stable moves" },
    { name: "USDCHF", image: "/images/usdchf-new.png", size: 40, msg: "Defensive pair, good for risk-off moves" },
    { name: "EURJPY", image: "/images/eurjpy.png", size: 40, msg: "smooth trends" },
  ]

  const levels = [
    { rowId: "184", symbols: ["🥉", "🥈", "🥇", "🎖️", "🏆"] },
    { rowId: "188", symbols: ["🥉", "🥈", "🥇", "🎖️", "🏆"] },
  ]

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <style jsx>{`
        .custom-checkbox {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 2px solid #555;
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          background-color: transparent;
        }
        .custom-checkbox:checked {
          border: none;
        }
        .custom-checkbox:checked::after {
          content: "⭐";
          color: #030303;
          position: absolute;
          left: 3px;
          top: -1px;
          font-size: 14px;
          font-weight: bold;
        }
      `}</style>

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
              <Image src="/images/design-mode/logo.svg" alt="Kokonut UI" width={20} height={20} />
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
            <div className="mb-8 max-w-4xl mx-auto space-y-4">
              {levels.map((level, tableIndex) => (
                <div
                  key={level.rowId}
                  className="bg-black/40 border border-white/20 rounded-lg backdrop-blur-sm overflow-hidden"
                >
                  <div
                    id={tableIndex === 0 ? "level-trade" : undefined}
                    className="border-b border-white/10 p-4 flex justify-center gap-6 text-2xl"
                  >
                    {level.symbols.map((symbol, idx) => {
                      const currentLevel = getCurrentLevel(level.rowId)
                      const isUnlocked = idx < currentLevel
                      return (
                        <div key={idx} className="cursor-pointer">
                          {isUnlocked ? (
                            <span>{symbol}</span>
                          ) : (
                            <Image
                              src="/images/stone.png"
                              alt="Stone"
                              width={28}
                              height={28}
                              className="object-contain"
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-white/80 font-medium p-3 text-center">id</th>
                          <th className="text-white/80 font-medium p-3 text-center">cost</th>
                          <th className="text-white/80 font-medium p-3 text-center">1x</th>
                          <th className="text-white/80 font-medium p-3 text-center">2x</th>
                          <th className="text-white/80 font-medium p-3 text-center">3x</th>
                          <th className="text-white/80 font-medium p-3 text-center">balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-white/5 transition-colors">
                          <td className="text-white p-3 text-center">#{level.rowId}</td>
                          <td className="text-white p-3 text-center">{getCost(level.rowId)}</td>
                          {["1", "2", "3"].map((mult) => (
                            <td key={mult} className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={checkedStates[`${level.rowId}-${mult}`] || false}
                                onChange={() => handleCheckboxChange(level.rowId, mult)}
                                className="custom-checkbox"
                              />
                            </td>
                          ))}
                          <td className="text-white p-3 text-center">{calculateWin(level.rowId)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mb-8 max-w-4xl mx-auto">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                  {currencyPairs.map((pair, index) => (
                    <div key={pair.name} style={{ height: 190 }} className="flex-[0_0_calc(50%-0.5rem)] min-w-0">
                      <motion.div
                        custom={2.1 + index * 0.1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-black/40 border border-white/20 rounded-lg p-6 backdrop-blur-sm h-full flex flex-col justify-between"
                      >
                        <div className="mb-4 flex justify-center">
                          <Image
                            src={pair.image || "/placeholder.svg"}
                            alt={pair.name}
                            width={pair.size}
                            height={pair.size}
                            className="rounded-full"
                          />
                        </div>
                        <div className="text-center">
                          <div className="text-white text-lg font-medium mb-2">{pair.name}</div>
                          <div className="text-gray-500 text-sm">{pair.msg}</div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-2 backdrop-blur-sm transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-2 backdrop-blur-sm transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              <div className="flex justify-center gap-2 mt-4">
                {currencyPairs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      selectedIndex === index ? "bg-yellow-400 w-6" : "bg-white/30 hover:bg-white/50",
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}
