# Providers — SEGIN

Serviços GraphQL de entidades do sistema. Todos seguem o mesmo padrão de consulta com seleção explícita de campos.

---

## Padrão de consulta com `fields`

Todos os métodos de leitura (`getXxx`, `getXxxById`) expõem apenas `_id` na query base. O chamador passa como string os campos que o template precisa.

### Exemplo no service

```typescript
async getStudents(args?, fields?) {
  return this.graphql.query(environment.API.segin, 'graphql', {
    query: `
    query Students {
      Students {
        _id
        ${fields || ""}
      }
    }`,
    name: "Students",
    variables: args || {}
  });
}

async getStudentById(_id, fields?) {
  return this.graphql.query(environment.API.segin, 'graphql', {
    query: `
    query StudentById($_id: String) {
      StudentById(_id: $_id) {
        _id
        ${fields || ""}
      }
    }`,
    name: "StudentById",
    variables: { _id }
  });
}
```

### Exemplo na página

```typescript
// Lista — passar apenas campos usados no template
async getStudents() {
  let data = await this.studentsService.getStudents({}, `
    name
    email
    active
  `);
  this.list_students = data || [];
}

// Detalhe — mesmo padrão
async loadStudent(_id: string) {
  let data = await this.studentsService.getStudentById(_id, `
    name
    email
    phone
    cgc
    dt_birthday
  `);
  this.student = data;
}
```

### Regras

| Situação | Como fazer |
|---|---|
| Listar sem campos visíveis | `getStudents()` — retorna só `_id` |
| Listar com campos | `getStudents({}, 'name email active')` |
| Buscar por filtro | `getStudents({ _class: id }, 'name')` |
| Buscar por ID | `getStudentById(_id, 'name phone')` — `_id` sempre 1º parâmetro |
| Seletor/autocomplete | `getStudents({}, 'name')` — mínimo necessário |

---

## Tabela de providers

### API Segin (`environment.API.segin`)

| Provider | Entidade | getAll | getById | Mutations |
|---|---|---|---|---|
| `agenda.service.ts` | Eventos de agenda | `getAgendas(args?, fields?)` | `getAgendaById(_id, fields?)` | `newAgenda` `editAgenda` `delAgenda` `saveAgenda` |
| `absences.service.ts` | Frequência/faltas | `getAbsences(args?, fields?)` | `getAbsenceById(_id, fields?)` | `newAbsence` `editAbsence` `delAbsence` `saveAbsence` |
| `banners.service.ts` | Banners | `getBanners(args?, fields?)` | `getBannerById(_id, fields?)` | `newBanner` `editBanner` `delBanner` `saveBanner` |
| `classes.service.ts` | Turmas | `getClasses(args?, fields?)` | `getClasseById(_id, fields?)` | `newClasse` `editClasse` `delClasse` `saveClasse` |
| `collaborators.service.ts` | Colaboradores | `getCollaborators(args?, fields?)` | `getCollaboratorById(_id, fields?)` | `newCollaborator` `editCollaborator` `delCollaborator` `saveCollaborator` |
| `configs.service.ts` | Configurações | `getConfigs(args?, fields?)` | `getConfigById(_id, fields?)` | `newConfig` `editConfig` `delConfig` `saveConfig` |
| `guardians.service.ts` | Responsáveis | `getGuardians(args?, fields?)` | `getGuardianById(_id, fields?)` | `newGuardian` `editGuardian` `delGuardian` `saveGuardian` |
| `institutions.service.ts` | Escolas | `getInstitutions(args?, fields?)` | `getInstitutionById(_id?, fields?)` | `newInstitution` `editInstitution` `delInstitution` `saveInstitution` |
| `journals.service.ts` | Diário do aluno | `getJournals(args?, fields?)` | `getJournalById(_id, fields?)` | `newJournal` `editJournal` `delJournal` `saveJournal` |
| `logs.service.ts` | Logs de acesso | `getLogs(args?, fields?)` | `getLogsById(_id, fields?)` | `newLogs` `editLogs` `delLogs` `saveLogs` |
| `meals.service.ts` | Alimentação | `getMeals(args?, fields?)` | `getMealById(_id, fields?)` | `newMeal` `editMeal` `delMeal` `saveMeal` |
| `notices.service.ts` | Avisos | `getNotices(args?, fields?)` `getAllNotices(args?, fields?)` | — | `newNotice` `editNotice` `delNotice` `saveNotice` |
| `notifications.service.ts` | Notificações | `getNotifications(args?, fields?)` `getNotificationsUnread(args?, fields?)` | `getNotificationsById(_id, fields?)` | — |
| `performance.service.ts` | Avaliações/marcos | `getPerformances(args?, fields?)` | `getPerformanceById(_id, fields?)` | `newPerformance` `editPerformance` `delPerformance` `savePerformance` |
| `person-links.service.ts` | Vínculos responsável↔aluno | `getPersonLinks(args?, fields?)` `getStudentsByGuardian(args?, fields?)` | `getPersonLinkById(_id, fields?)` | `newPersonLink` `editPersonLink` `delPersonLink` `savePersonLink` |
| `reports.service.ts` | Relatórios | `getReports(args?, fields?)` | `getReportById(_id, fields?)` | `newReport` `editReport` `delReport` `saveReport` |
| `resources.service.ts` | Recursos estáticos | `getParentescos()` `getTiposSanguineos()` `getReligioes()` `getEstCivil()` `getListaBancos()` `getEstadosCidade()` | — | — |
| `student-class-links.service.ts` | Matrículas | `getStudentClassLinks(args?, fields?)` | `getStudentClassLinkById(_id, fields?)` | `newStudentClassLink` `editStudentClassLink` `delStudentClassLink` `saveStudentClassLink` |
| `students.service.ts` | Alunos | `getStudents(args?, fields?)` | `getStudentById(_id, fields?)` | `newStudent` `editStudent` `delStudent` `saveStudent` |
| `subjects.service.ts` | Conteúdos/atividades | `getSubjects(args?, fields?)` | `getSubjectById(_id, fields?)` | `newSubject` `editSubject` `delSubject` `saveSubject` |
| `teachers.service.ts` | Professores | `getTeachers(args?, fields?)` | `getTeacherById(_id, fields?)` | `newTeacher` `editTeacher` `delTeacher` `saveTeacher` |

### API Admin (`environment.API.admin`)

| Provider | Entidade | getAll | getById | Extras |
|---|---|---|---|---|
| `modules.service.ts` | Módulos do menu | `getModulos(fields?)` | `getModuloById(_id, fields?)` | `newModulo` `editModulo` `delModulo` `saveModulo` |
| `pages.service.ts` | Páginas do menu | `getPaginas(fields?)` | `getPaginaById(_id, fields?)` | `newPagina` `editPagina` `delPagina` `savePagina` |
| `permissions.service.ts` | Permissões | `getPermissions(fields?)` | `getPermissionById(_id, fields?)` | `editPermission` `delPermission` `savePermission` |
| `persons.service.ts` | Pessoas físicas | `getPersons(args?, fields?)` | `getPersonInfo(_id, fields)` | `newPerson` `editPerson` `delPerson` `savePerson` `CreatePersonUser` |
| `roles.service.ts` | Perfis/roles | `getRoles(fields?)` | `getRoleById(_id, fields?)` | `getUsersByRole(_id, fields?)` `setUserRole` `rmUserRole` `newRole` `editRole` `delRole` `saveRole` |
| `users.service.ts` | Usuários | `getUsers(args?, fields?)` | `getUserById(_id, fields?)` | `newUser` `editUser` `delUser` `saveUser` |

### Serviços especiais (não seguem o padrão de entidade)

| Provider | Finalidade |
|---|---|
| `user.service.ts` | Auth, login, logout, setUser, redirect — lógica de sessão |

---

## Padrão `saveXxx`

Todos os providers expõem um método `saveXxx(data)` que decide entre criar ou editar:

```typescript
saveStudent(data) {
  return this[data._id ? 'editStudent' : 'newStudent']({ input: data });
}
```

Use sempre `saveXxx` nos formulários — ele detecta automaticamente se é criação ou edição pelo `_id`.

---

## BehaviorSubject / watch / trigger

Todos os providers expõem um observable `watch` para recarregar listas em tempo real:

```typescript
// Na página — escutar mudanças
this.studentsService.watch.subscribe(v => {
  if (v) this.reloadTable.next(true);
});

// Após salvar/deletar — notificar
this.studentsService.trigger();
```

---

## Observações

- Providers com `return this.mock` antes do GraphQL ainda estão em modo de desenvolvimento (meals, subjects, journals, performance, reports). O mock é substituído quando o backend estiver pronto removendo a linha `return this.mock`.
- `resources.service.ts` retorna dados estáticos de domínio (parentescos, tipos sanguíneos, etc.) — não usa `fields` pois o schema é fixo.
- `notifications.service.ts` não tem mutations pois as notificações são criadas pelo sistema, não pelo usuário.
