
async function createAttack(id, description, name, x_mitre_platforms, x_mitre_detection, kill_chain_phases) {
    try {
      const attacksRef = ref(database, 'attacks');
      const newAttackRef = push(attacksRef);
  
      const attack = {
        id,
        description,
        name,
        x_mitre_platforms,
        x_mitre_detection,
        kill_chain_phases: kill_chain_phases.map(phase => ({
          kill_chain_name: phase.kill_chain_name,
          phase_name: phase.phase_name
        }))
      };
  
      await set(newAttackRef, attack);
      console.log('Attack successfully created in the database.');
    } catch (error) {
      console.error('Error creating attack:', error);
    }
  }
  
  async function putAttacksFromFile(filePath) {
    try {
      const attacksData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
      if (!attacksData || typeof attacksData !== 'object') {
        throw new Error('Invalid JSON data');
      }
  
      for (const attack of attacksData.objects) {
        const { id, description, name, x_mitre_platforms, x_mitre_detection, kill_chain_phases } = attack;
        await createAttack(id, description, name, x_mitre_platforms, x_mitre_detection, kill_chain_phases ? kill_chain_phases : []);
      }
  
      console.log('Attacks data successfully added to the database.');
    } catch (error) {
      console.error('Error putting attacks data into the database:', error);
    }
  }
  
  async function putAttacksFromDirectory(directoryPath) {
    try {
      const files = fs.readdirSync(directoryPath);
  
      for (const file of files) {
        const filePath = path.join(directoryPath, file);
        await putAttacksFromFile(filePath);
      }
  
      console.log('Attacks data from directory successfully added to the database.');
    } catch (error) {
      console.error('Error putting attacks data from directory into the database:', error);
    }
  }