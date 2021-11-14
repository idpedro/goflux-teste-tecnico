import { createConnection } from "typeorm";
import { setTimeout } from "timers";

(async function startConnettion() {
  try {
    console.log("Iniciando conexão com o banco de dados");
    await createConnection();
    console.log("< Conexão com o banco de dados iniciada >");
  } catch (error) {
    console.error(
      "Não foi possivel conectar-se ao banco de dados,tendando novamente em 5s"
    );
    setTimeout(startConnettion, 5000);
  }
})();
