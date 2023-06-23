import { InMemoryGoalRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-goal-repository";
import { makeGoal } from "@/main/factories/test/make-goal";
import { UniqueEntityID } from "@/application/entities/value-objects/unique-entity-id";
import { GetConsolidatedForTheYearUseCase } from "./get-consolidated-for-the-year";
import { InMemoryCompanySectorRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-company-sector-repository";
import { InMemorySectorRepository } from "@/infrastructure/databases/repositories/in-memory/in-memory-sector-repository";
import { makeSector } from "@/main/factories/test/make-sector";
import { makeCompanySector } from "@/main/factories/test/make-company-sector";
import { makeCompany } from "@/main/factories/test/make-company";

let inMemoryGoalRepository: InMemoryGoalRepository;
let inMemoryCompanySectorRepository: InMemoryCompanySectorRepository;
let inMemorySectorRepository: InMemorySectorRepository;
let sut: GetConsolidatedForTheYearUseCase;

describe("Fetch consolidation goals", () => {
  beforeEach(() => {
    inMemorySectorRepository = new InMemorySectorRepository();
    inMemoryGoalRepository = new InMemoryGoalRepository();
    inMemoryCompanySectorRepository = new InMemoryCompanySectorRepository(
      inMemorySectorRepository,
      inMemoryGoalRepository
    );
    sut = new GetConsolidatedForTheYearUseCase(inMemoryCompanySectorRepository);
  });

  it("should be able to fetch consolidation goals", async () => {
    const company = makeCompany({}, new UniqueEntityID("new-company-1"));

    const sector = makeSector({
      name: "INFORMATICA",
    });

    const companySector = makeCompanySector({
      company_id: company.id,
      sector_id: sector.id,
      type: "MAIN",
    });

    await inMemorySectorRepository.create(sector);
    await inMemoryCompanySectorRepository.create(companySector);

    await inMemoryGoalRepository.create(
      makeGoal({
        company_sector_id: companySector.id,
        company_id: companySector.company_id,
        date: new Date(2022, 0, 20),
      })
    );
    await inMemoryGoalRepository.create(
      makeGoal({
        company_sector_id: companySector.id,
        company_id: companySector.company_id,
        date: new Date(2023, 1, 18),
      })
    );
    await inMemoryGoalRepository.create(
      makeGoal({
        company_sector_id: companySector.id,
        company_id: companySector.company_id,
        date: new Date(2023, 2, 23),
      })
    );

    const goals = await sut.execute({
      company_id: companySector.company_id.toValue(),
      date: 2023,
    });

    if (goals.isRight()) {
      expect(goals.value.consolidation).toEqual(
        expect.arrayContaining([
          {
            company_id: company.id,
            sector_id: sector.id,
            company_sector_id: companySector.id,
            name: "INFORMATICA",
            type: "MAIN",
            amount_in_cent: 231030,
          },
        ])
      );
    }
  });

  it("should be able to fetch consolidation goals with a subsector", async () => {
    const company = makeCompany({}, new UniqueEntityID("new-company-1"));

    const mainSector = makeSector({
      name: "INFORMATICA",
    });

    const subSector = makeSector({
      name: "GAMES",
    });

    const companySectorMain = makeCompanySector({
      company_id: company.id,
      sector_id: mainSector.id,
      type: "MAIN",
    });

    const companySectorSub = makeCompanySector({
      company_id: company.id,
      sector_id: subSector.id,
      type: "SUB",
      main_sector: companySectorMain.id,
    });

    await inMemorySectorRepository.create(mainSector);
    await inMemorySectorRepository.create(subSector);
    await inMemoryCompanySectorRepository.create(companySectorMain);
    await inMemoryCompanySectorRepository.create(companySectorSub);

    await inMemoryGoalRepository.create(
      makeGoal({
        company_sector_id: companySectorMain.id,
        company_id: companySectorMain.company_id,
        date: new Date(2022, 0, 20),
      })
    );
    await inMemoryGoalRepository.create(
      makeGoal({
        company_sector_id: companySectorMain.id,
        company_id: companySectorMain.company_id,
        date: new Date(2023, 1, 18),
      })
    );
    await inMemoryGoalRepository.create(
      makeGoal({
        company_sector_id: companySectorMain.id,
        company_id: companySectorMain.company_id,
        date: new Date(2023, 2, 23),
      })
    );
    await inMemoryGoalRepository.create(
      makeGoal({
        company_sector_id: companySectorSub.id,
        company_id: companySectorSub.company_id,
        date: new Date(2023, 2, 27),
      })
    );

    const goals = await sut.execute({
      company_id: companySectorMain.company_id.toValue(),
      date: 2023,
    });

    if (goals.isRight()) {
      expect(goals.value.consolidation).toEqual(
        expect.arrayContaining([
          {
            company_id: company.id,
            sector_id: mainSector.id,
            company_sector_id: companySectorMain.id,
            name: "INFORMATICA",
            type: "MAIN",
            amount_in_cent: 231030,
          },
          {
            company_id: company.id,
            sector_id: subSector.id,
            company_sector_id: companySectorSub.id,
            name: "GAMES",
            type: "SUB",
            amount_in_cent: 115515,
          },
        ])
      );
    }
  });
});
