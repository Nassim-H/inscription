export function getMontantCours(cours: string[] = []): number {
  const sorted = [...cours].sort().join(",")

  switch (sorted) {
    case "1":
    case "2":
      return 120
    case "3":
      return 40
    case "1,2":
      return 220
    case "1,3":
    case "2,3":
      return 150
    case "1,2,3":
      return 250
    default:
      return 0
  }
}
