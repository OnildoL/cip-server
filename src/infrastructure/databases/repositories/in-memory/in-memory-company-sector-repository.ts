import { CompanySector } from "@/application/entities/company-sector";
import { Goal } from "@/application/entities/goal";
import { CompanySectorRepository } from "@/application/use-cases/ports/company-sector-repository";
import { GoalRepository } from "@/application/use-cases/ports/goal-repository";
import { SectorRepository } from "@/application/use-cases/ports/sector-repository";

export class InMemoryCompanySectorRepository
  implements CompanySectorRepository
{
  public items: CompanySector[] = [];

  constructor(
    private sectorRepository?: SectorRepository,
    private goalRepository?: GoalRepository
  ) {}

  async findMany(companyId: string) {
    const companySector = this.items.filter(
      (item) => item.company_id.toValue() === companyId
    );

    return companySector;
  }

  async create(companySector: CompanySector) {
    this.items.push(companySector);
  }

  async consolidation(companyId: string, date: number) {
    const companySector = await this.findMany(companyId);

    const consolidationPromises = companySector.map(async (companySector) => {
      const sector = await this.getSector(companySector.sector_id.toValue());

      const goals = await this.fetchGoals(companySector.id.toValue(), date);

      const totalAmount = this.calculateTotalAmount(goals ?? []);

      return {
        company_id: companySector.company_id,
        sector_id: sector?.id ? sector.id : null,
        company_sector_id: companySector.id,
        name: sector?.name ? sector.name : null,
        type: companySector.type,
        amount_in_cent: totalAmount,
      };
    });

    try {
      const consolidation = await Promise.all(consolidationPromises);

      return consolidation;
    } catch (error) {
      throw new Error("Failed to consolidate data.");
    }
  }

  private async getSector(sectorId: string) {
    try {
      return await this.sectorRepository?.findById(sectorId);
    } catch (error) {
      throw new Error("Failed to get sector");
    }
  }

  private async fetchGoals(companySectorId: string, date: number) {
    try {
      return await this.goalRepository?.findMany(companySectorId, date);
    } catch (error) {
      throw new Error("Failed to fetch goals.");
    }
  }

  private calculateTotalAmount(goals: Goal[]) {
    return goals.reduce((total, goal) => total + goal.amount_in_cent, 0);
  }
}
