## Estrutura de projeto
src/
├── app.module.ts          # Módulo raiz
├── main.ts                # Ponto de entrada
├── common/                # Código compartilhado
├── config/                # Configurações
├── modules/               # Módulos por funcionalidade
│   ├── users/
│   ├── auth/
│   └── ...
├── database/              # Configurações do banco
├── shared/                # Helpers e utilitários
└── infrastructure/        # Integrações externas

src/common/
├── filters/
│   └── http-exception.filter.ts
├── pipes/
│   └── validation.pipe.ts
├── guards/
│   └── auth.guard.ts
├── interceptors/
│   └── logging.interceptor.ts
├── dtos/
│   └── pagination.dto.ts
├── enums/
│   └── roles.enum.ts
├── constants/
│   └── app.constants.ts
└── utils/
    └── date.helper.ts

    src/shared/
├── helpers/
│   ├── format-date.helper.ts
│   └── calculate-age.helper.ts
├── constants/
│   ├── app.constants.ts
│   └── error-messages.ts
├── types/
│   ├── pagination.interface.ts
│   └── response.interface.ts
└── middleware/
    └── request-logger.middleware.ts
