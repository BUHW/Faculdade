const { pool } = require("../../db/conections");
const moment = require("moment");

async function getLastVacuumDate() {
  try {
    const client = await pool.connect();
    const res = await client.query(`
        SELECT last_vacuum FROM pg_stat_all_tables WHERE schemaname = 'public' ORDER BY last_vacuum DESC LIMIT 1;
      `);
    client.release();

    if (res.rows.length > 0 && res.rows[0].last_vacuum) {
      return moment(res.rows[0].last_vacuum);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao obter a data do último Vacuum:", error);
  }
}

async function executeVacuum(full = false) {
  try {
    const client = await pool.connect();
    const command = full ? "VACUUM FULL ANALYZE;" : "VACUUM;";
    await client.query(command);
    client.release();
    console.log(
      full
        ? "Vacuum FULL executado com sucesso."
        : "Vacuum executado com sucesso."
    );
  } catch (error) {
    console.error("Erro ao executar o Vacuum:", error);
  }
}

async function executeReindex() {
  try {
    const client = await pool.connect();
    await client.query("REINDEX DATABASE Trabalho1;");
    client.release();
    console.log("Reindex executado com sucesso.");
  } catch (error) {
    console.error("Erro ao executar o Reindex:", error);
  }
}

async function executarRotinaVacuum(opcoes) {
  const { vacum, full, reindex } = opcoes;

  const lastVacuumDate = await getLastVacuumDate();

  if (lastVacuumDate) {
    const daysSinceLastVacuum = moment().diff(lastVacuumDate, "days");
    console.log(`Dias desde o último Vacuum: ${daysSinceLastVacuum}`);

    if (daysSinceLastVacuum > 60 && full === "S") {
      await executeVacuum(true);
    } else if (daysSinceLastVacuum >= 30 && vacum === "S") {
      await executeVacuum(false);
    }
  } else {
    console.log(
      "Nenhum Vacuum anterior foi encontrado, executando Vacuum completo."
    );
    if (full === "S") {
      await executeVacuum(true);
    } else if (vacum === "S") {
      await executeVacuum(false);
    }
  }

  if (reindex === "S") {
    await executeReindex();
  }
}

module.exports = {
    executarRotinaVacuum
}