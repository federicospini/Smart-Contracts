import { TezosNodeWriter, StoreType, TezosParameterFormat } from 'conseiljs';

const tezosNode = 'https://tezos-dev.cryptonomic-infra.tech/';

async function deployContract() {
    const keystore = {
        publicKey: 'edpkuuGJ4ssH3N5k7ovwkBe16p8rVX1XLENiZ4FAayrcwUf9sCKXnG',
        privateKey: 'edskRpVqFG2FHo11aB9pzbnHBiPBWhNWdwtNyQSfEEhDf5jhFbAtNS41vg9as7LSYZv6rEbtJTwyyEg9cNDdcAkSr9Z7hfvquB',
        publicKeyHash: 'tz1WpPzK6NwWVTJcXqFvYmoA6msQeVy1YP6z',
        seed: '',
        storeType: StoreType.Fundraiser
    };

    const michelson = `
   parameter
   (or (pair %transfer (address :from) (pair (address :to) (nat :value)))
         (or (pair %approve (address :spender) (nat :value))
            (or (pair %getAllowance
                  (pair (address :owner) (address :spender))
                  (contract (nat :remaining)))
               (or (pair %getBalance (address :owner) (contract (nat :balance)))
                     (or (pair %getTotalSupply unit (contract (nat :totalSupply)))
                        (or (bool %setPause)
                           (or (address %setAdministrator)
                                 (or (pair %getAdministrator unit (contract (address :administrator)))
                                    (or (pair %mint (address :to) (nat :value))
                                       (pair %burn (address :from) (nat :value)))))))))));
   storage
   (pair (big_map address (pair nat (map address nat))) (pair address (pair bool nat)));
   code { DUP ;
         CAR ;
         DIP { CDR } ;
         IF_LEFT
            { DIP { DUP ;
                  CDR ;
                  CDR ;
                  CAR ;
                  IF { PUSH (pair string unit) (Pair "OperationsArePaused" Unit) ; FAILWITH } {} } ;
            DUP ;
            CDR ;
            CAR ;
            DIP { DUP ; CAR } ;
            CAST address ;
            COMPARE ;
            EQ ;
            IF { DROP }
               { DUP ;
                  CAR ;
                  DIP { DIP { DUP } ; SWAP } ;
                  SENDER ;
                  COMPARE ;
                  EQ ;
                  IF { DROP ; PUSH bool False } { CDR ; CAR ; SENDER ; COMPARE ; NEQ } ;
                  IF { DUP ;
                        DIP { DUP ;
                              DIP { DIP { DUP } ;
                                    CAR ;
                                    SENDER ;
                                    PAIR ;
                                    DUP ;
                                    DIP { CDR ;
                                          DIP { CAR } ;
                                          GET ;
                                          IF_NONE { EMPTY_MAP address nat } { CDR } } ;
                                    CAR ;
                                    GET ;
                                    IF_NONE { PUSH nat 0 } {} } ;
                              DUP ;
                              CAR ;
                              DIP { SENDER ;
                                    DIP { DUP ;
                                          CDR ;
                                          CDR ;
                                          DIP { DIP { DUP } ; SWAP } ;
                                          SWAP ;
                                          SUB ;
                                          ISNAT ;
                                          IF_NONE
                                          { DIP { DUP } ;
                                             SWAP ;
                                             DIP { DUP } ;
                                             SWAP ;
                                             CDR ;
                                             CDR ;
                                             PAIR ;
                                             PUSH string "NotEnoughAllowance" ;
                                             PAIR ;
                                             FAILWITH }
                                          {} } ;
                                    PAIR } ;
                              PAIR ;
                              DIP { DROP ; DROP } ;
                              DIP { DUP ; CAR } ;
                              SWAP ;
                              DIP { DUP ; CAR } ;
                              SWAP ;
                              GET ;
                              IF_NONE
                              { PUSH nat 0 ;
                                 DIP { EMPTY_MAP address nat } ;
                                 PAIR ;
                                 EMPTY_MAP address nat }
                              { DUP ; CDR } ;
                              DIP { DIP { DUP } ; SWAP } ;
                              SWAP ;
                              CDR ;
                              CDR ;
                              DUP ;
                              INT ;
                              EQ ;
                              IF { DROP ; NONE nat } { SOME } ;
                              DIP { DIP { DIP { DUP } ; SWAP } ; SWAP } ;
                              SWAP ;
                              CDR ;
                              CAR ;
                              UPDATE ;
                              DIP { DUP ; DIP { CAR } ; CDR } ;
                              DIP { DROP } ;
                              SWAP ;
                              PAIR ;
                              SOME ;
                              SWAP ;
                              CAR ;
                              DIP { DIP { DUP ; CAR } } ;
                              UPDATE ;
                              DIP { DUP ; DIP { CDR } ; CAR } ;
                              DIP { DROP } ;
                              PAIR } }
                     {} ;
                  DIP { DUP } ;
                  SWAP ;
                  CAR ;
                  DIP { DUP } ;
                  SWAP ;
                  CDR ;
                  CAR ;
                  GET ;
                  IF_NONE
                     { DUP ;
                     CDR ;
                     CDR ;
                     INT ;
                     EQ ;
                     IF { NONE (pair nat (map address nat)) }
                        { DUP ; CDR ; CDR ; DIP { EMPTY_MAP address nat } ; PAIR ; SOME } }
                     { DIP { DUP } ;
                     SWAP ;
                     CDR ;
                     CDR ;
                     DIP { DUP ; CAR } ;
                     ADD ;
                     DIP { DUP ; DIP { CDR } ; CAR } ;
                     DIP { DROP } ;
                     PAIR ;
                     SOME } ;
                  SWAP ;
                  DIP { DIP { DUP ; CAR } } ;
                  DUP ;
                  DIP { CDR ;
                        CAR ;
                        UPDATE ;
                        DIP { DUP ; DIP { CDR } ; CAR } ;
                        DIP { DROP } ;
                        PAIR } ;
                  DUP ;
                  DIP { CDR ;
                        CDR ;
                        INT ;
                        DIP { DUP ; CDR ; DUP ; CDR ; CDR } ;
                        ADD ;
                        ISNAT ;
                        IF_NONE
                           { PUSH string
                                 "Unexpected failure: Negative total supply\nCallStack (from HasCallStack):\n  failUnexpected, called at src/Lorentz/Contracts/ManagedLedger.hs:313:27 in lorentz-contracts-0.2.0.1-HpDIkWsKofu3zAjntLgs8J:Lorentz.Contracts.ManagedLedger" ;
                           FAILWITH }
                           {} ;
                        DIP { DUP ; DIP { CAR } ; CDR } ;
                        DIP { DUP ; DIP { CAR } ; CDR } ;
                        DIP { DROP } ;
                        SWAP ;
                        PAIR ;
                        SWAP ;
                        PAIR ;
                        DIP { DUP ; DIP { CAR } ; CDR } ;
                        DIP { DROP } ;
                        SWAP ;
                        PAIR } ;
                  DIP { DUP } ;
                  SWAP ;
                  CAR ;
                  DIP { DUP } ;
                  SWAP ;
                  CAR ;
                  GET ;
                  IF_NONE
                     { CDR ;
                     CDR ;
                     PUSH nat 0 ;
                     SWAP ;
                     PAIR ;
                     PUSH string "NotEnoughBalance" ;
                     PAIR ;
                     FAILWITH }
                     {} ;
                  DUP ;
                  CAR ;
                  DIP { DIP { DUP } ; SWAP } ;
                  SWAP ;
                  CDR ;
                  CDR ;
                  SWAP ;
                  SUB ;
                  ISNAT ;
                  IF_NONE
                     { CAR ;
                     DIP { DUP } ;
                     SWAP ;
                     CDR ;
                     CDR ;
                     PAIR ;
                     PUSH string "NotEnoughBalance" ;
                     PAIR ;
                     FAILWITH }
                     {} ;
                  DIP { DUP ; DIP { CDR } ; CAR } ;
                  DIP { DROP } ;
                  PAIR ;
                  DIP { DUP } ;
                  SWAP ;
                  DIP { DUP ;
                        CAR ;
                        INT ;
                        EQ ;
                        IF { DUP ;
                              CDR ;
                              SIZE ;
                              INT ;
                              EQ ;
                              IF { DROP ; NONE (pair nat (map address nat)) } { SOME } }
                           { SOME } ;
                        SWAP ;
                        CAR ;
                        DIP { DIP { DUP ; CAR } } ;
                        UPDATE ;
                        DIP { DUP ; DIP { CDR } ; CAR } ;
                        DIP { DROP } ;
                        PAIR } ;
                  DUP ;
                  DIP { CDR ;
                        CDR ;
                        NEG ;
                        DIP { DUP ; CDR ; DUP ; CDR ; CDR } ;
                        ADD ;
                        ISNAT ;
                        IF_NONE
                           { PUSH string
                                 "Unexpected failure: Negative total supply\nCallStack (from HasCallStack):\n  failUnexpected, called at src/Lorentz/Contracts/ManagedLedger.hs:313:27 in lorentz-contracts-0.2.0.1-HpDIkWsKofu3zAjntLgs8J:Lorentz.Contracts.ManagedLedger" ;
                           FAILWITH }
                           {} ;
                        DIP { DUP ; DIP { CAR } ; CDR } ;
                        DIP { DUP ; DIP { CAR } ; CDR } ;
                        DIP { DROP } ;
                        SWAP ;
                        PAIR ;
                        SWAP ;
                        PAIR ;
                        DIP { DUP ; DIP { CAR } ; CDR } ;
                        DIP { DROP } ;
                        SWAP ;
                        PAIR } ;
                  DROP } ;
            NIL operation ;
            PAIR }
            { IF_LEFT
               { DIP { DUP ;
                        CDR ;
                        CDR ;
                        CAR ;
                        IF { PUSH (pair string unit) (Pair "OperationsArePaused" Unit) ; FAILWITH } {} } ;
                  SENDER ;
                  PAIR ;
                  DIP { DUP } ;
                  SWAP ;
                  DIP { DUP } ;
                  SWAP ;
                  DUP ;
                  DIP { CAR ;
                        DIP { CAR } ;
                        GET ;
                        IF_NONE { EMPTY_MAP address nat } { CDR } } ;
                  CDR ;
                  CAR ;
                  GET ;
                  IF_NONE { PUSH nat 0 } {} ;
                  DUP ;
                  INT ;
                  EQ ;
                  IF { DROP }
                     { DIP { DUP } ;
                     SWAP ;
                     CDR ;
                     CDR ;
                     INT ;
                     EQ ;
                     IF { DROP } { PUSH string "UnsafeAllowanceChange" ; PAIR ; FAILWITH } } ;
                  DIP { DUP ; CAR } ;
                  SWAP ;
                  DIP { DUP ; CAR } ;
                  SWAP ;
                  GET ;
                  IF_NONE
                  { PUSH nat 0 ;
                     DIP { EMPTY_MAP address nat } ;
                     PAIR ;
                     EMPTY_MAP address nat }
                  { DUP ; CDR } ;
                  DIP { DIP { DUP } ; SWAP } ;
                  SWAP ;
                  CDR ;
                  CDR ;
                  DUP ;
                  INT ;
                  EQ ;
                  IF { DROP ; NONE nat } { SOME } ;
                  DIP { DIP { DIP { DUP } ; SWAP } ; SWAP } ;
                  SWAP ;
                  CDR ;
                  CAR ;
                  UPDATE ;
                  DIP { DUP ; DIP { CAR } ; CDR } ;
                  DIP { DROP } ;
                  SWAP ;
                  PAIR ;
                  SOME ;
                  SWAP ;
                  CAR ;
                  DIP { DIP { DUP ; CAR } } ;
                  UPDATE ;
                  DIP { DUP ; DIP { CDR } ; CAR } ;
                  DIP { DROP } ;
                  PAIR ;
                  NIL operation ;
                  PAIR }
               { IF_LEFT
                  { DUP ;
                     CAR ;
                     DIP { CDR } ;
                     DIP { DIP { DUP } ; SWAP } ;
                     PAIR ;
                     DUP ;
                     CAR ;
                     DIP { CDR } ;
                     DUP ;
                     DIP { CAR ;
                           DIP { CAR } ;
                           GET ;
                           IF_NONE { EMPTY_MAP address nat } { CDR } } ;
                     CDR ;
                     GET ;
                     IF_NONE { PUSH nat 0 } {} ;
                     DIP { AMOUNT } ;
                     TRANSFER_TOKENS ;
                     NIL operation ;
                     SWAP ;
                     CONS ;
                     PAIR }
                  { IF_LEFT
                        { DUP ;
                        CAR ;
                        DIP { CDR } ;
                        DIP { DIP { DUP } ; SWAP } ;
                        PAIR ;
                        DUP ;
                        CAR ;
                        DIP { CDR } ;
                        DIP { CAR } ;
                        GET ;
                        IF_NONE { PUSH nat 0 } { CAR } ;
                        DIP { AMOUNT } ;
                        TRANSFER_TOKENS ;
                        NIL operation ;
                        SWAP ;
                        CONS ;
                        PAIR }
                        { IF_LEFT
                           { DUP ;
                              CAR ;
                              DIP { CDR } ;
                              DIP { DIP { DUP } ; SWAP } ;
                              PAIR ;
                              CDR ;
                              CDR ;
                              CDR ;
                              CDR ;
                              DIP { AMOUNT } ;
                              TRANSFER_TOKENS ;
                              NIL operation ;
                              SWAP ;
                              CONS ;
                              PAIR }
                           { IF_LEFT
                              { DIP { DUP ;
                                       CDR ;
                                       CAR ;
                                       SENDER ;
                                       COMPARE ;
                                       EQ ;
                                       IF {} { PUSH (pair string unit) (Pair "SenderIsNotAdmin" Unit) ; FAILWITH } } ;
                                 DIP { DUP ; CDR } ;
                                 DIP { DUP ; DIP { CAR } ; CDR } ;
                                 DIP { DUP ; DIP { CDR } ; CAR } ;
                                 DIP { DROP } ;
                                 PAIR ;
                                 SWAP ;
                                 PAIR ;
                                 DIP { DUP ; DIP { CAR } ; CDR } ;
                                 DIP { DROP } ;
                                 SWAP ;
                                 PAIR ;
                                 NIL operation ;
                                 PAIR }
                              { IF_LEFT
                                    { DIP { DUP ;
                                          CDR ;
                                          CAR ;
                                          SENDER ;
                                          COMPARE ;
                                          EQ ;
                                          IF {} { PUSH (pair string unit) (Pair "SenderIsNotAdmin" Unit) ; FAILWITH } } ;
                                    DIP { DUP ; CDR } ;
                                    DIP { DUP ; DIP { CDR } ; CAR } ;
                                    DIP { DROP } ;
                                    PAIR ;
                                    DIP { DUP ; DIP { CAR } ; CDR } ;
                                    DIP { DROP } ;
                                    SWAP ;
                                    PAIR ;
                                    NIL operation ;
                                    PAIR }
                                    { IF_LEFT
                                       { DUP ;
                                          CAR ;
                                          DIP { CDR } ;
                                          DIP { DIP { DUP } ; SWAP } ;
                                          PAIR ;
                                          CDR ;
                                          CDR ;
                                          CAR ;
                                          DIP { AMOUNT } ;
                                          TRANSFER_TOKENS ;
                                          NIL operation ;
                                          SWAP ;
                                          CONS ;
                                          PAIR }
                                       { IF_LEFT
                                          { DIP { DUP ;
                                                   CDR ;
                                                   CAR ;
                                                   SENDER ;
                                                   COMPARE ;
                                                   EQ ;
                                                   IF {} { PUSH (pair string unit) (Pair "SenderIsNotAdmin" Unit) ; FAILWITH } } ;
                                             DIP { DUP } ;
                                             SWAP ;
                                             CAR ;
                                             DIP { DUP } ;
                                             SWAP ;
                                             CAR ;
                                             GET ;
                                             IF_NONE
                                                { DUP ;
                                                CDR ;
                                                INT ;
                                                EQ ;
                                                IF { NONE (pair nat (map address nat)) }
                                                   { DUP ; CDR ; DIP { EMPTY_MAP address nat } ; PAIR ; SOME } }
                                                { DIP { DUP } ;
                                                SWAP ;
                                                CDR ;
                                                DIP { DUP ; CAR } ;
                                                ADD ;
                                                DIP { DUP ; DIP { CDR } ; CAR } ;
                                                DIP { DROP } ;
                                                PAIR ;
                                                SOME } ;
                                             SWAP ;
                                             DIP { DIP { DUP ; CAR } } ;
                                             DUP ;
                                             DIP { CAR ;
                                                   UPDATE ;
                                                   DIP { DUP ; DIP { CDR } ; CAR } ;
                                                   DIP { DROP } ;
                                                   PAIR } ;
                                             DUP ;
                                             DIP { CDR ;
                                                   INT ;
                                                   DIP { DUP ; CDR ; DUP ; CDR ; CDR } ;
                                                   ADD ;
                                                   ISNAT ;
                                                   IF_NONE
                                                      { PUSH string
                                                            "Unexpected failure: Negative total supply\nCallStack (from HasCallStack):\n  failUnexpected, called at src/Lorentz/Contracts/ManagedLedger.hs:313:27 in lorentz-contracts-0.2.0.1-HpDIkWsKofu3zAjntLgs8J:Lorentz.Contracts.ManagedLedger" ;
                                                      FAILWITH }
                                                      {} ;
                                                   DIP { DUP ; DIP { CAR } ; CDR } ;
                                                   DIP { DUP ; DIP { CAR } ; CDR } ;
                                                   DIP { DROP } ;
                                                   SWAP ;
                                                   PAIR ;
                                                   SWAP ;
                                                   PAIR ;
                                                   DIP { DUP ; DIP { CAR } ; CDR } ;
                                                   DIP { DROP } ;
                                                   SWAP ;
                                                   PAIR } ;
                                             DROP ;
                                             NIL operation ;
                                             PAIR }
                                          { DIP { DUP ;
                                                   CDR ;
                                                   CAR ;
                                                   SENDER ;
                                                   COMPARE ;
                                                   EQ ;
                                                   IF {} { PUSH (pair string unit) (Pair "SenderIsNotAdmin" Unit) ; FAILWITH } } ;
                                             DIP { DUP } ;
                                             SWAP ;
                                             CAR ;
                                             DIP { DUP } ;
                                             SWAP ;
                                             CAR ;
                                             GET ;
                                             IF_NONE
                                                { CDR ;
                                                PUSH nat 0 ;
                                                SWAP ;
                                                PAIR ;
                                                PUSH string "NotEnoughBalance" ;
                                                PAIR ;
                                                FAILWITH }
                                                {} ;
                                             DUP ;
                                             CAR ;
                                             DIP { DIP { DUP } ; SWAP } ;
                                             SWAP ;
                                             CDR ;
                                             SWAP ;
                                             SUB ;
                                             ISNAT ;
                                             IF_NONE
                                                { CAR ;
                                                DIP { DUP } ;
                                                SWAP ;
                                                CDR ;
                                                PAIR ;
                                                PUSH string "NotEnoughBalance" ;
                                                PAIR ;
                                                FAILWITH }
                                                {} ;
                                             DIP { DUP ; DIP { CDR } ; CAR } ;
                                             DIP { DROP } ;
                                             PAIR ;
                                             DIP { DUP } ;
                                             SWAP ;
                                             DIP { DUP ;
                                                   CAR ;
                                                   INT ;
                                                   EQ ;
                                                   IF { DUP ;
                                                         CDR ;
                                                         SIZE ;
                                                         INT ;
                                                         EQ ;
                                                         IF { DROP ; NONE (pair nat (map address nat)) } { SOME } }
                                                      { SOME } ;
                                                   SWAP ;
                                                   CAR ;
                                                   DIP { DIP { DUP ; CAR } } ;
                                                   UPDATE ;
                                                   DIP { DUP ; DIP { CDR } ; CAR } ;
                                                   DIP { DROP } ;
                                                   PAIR } ;
                                             DUP ;
                                             DIP { CDR ;
                                                   NEG ;
                                                   DIP { DUP ; CDR ; DUP ; CDR ; CDR } ;
                                                   ADD ;
                                                   ISNAT ;
                                                   IF_NONE
                                                      { PUSH string
                                                            "Unexpected failure: Negative total supply\nCallStack (from HasCallStack):\n  failUnexpected, called at src/Lorentz/Contracts/ManagedLedger.hs:313:27 in lorentz-contracts-0.2.0.1-HpDIkWsKofu3zAjntLgs8J:Lorentz.Contracts.ManagedLedger" ;
                                                      FAILWITH }
                                                      {} ;
                                                   DIP { DUP ; DIP { CAR } ; CDR } ;
                                                   DIP { DUP ; DIP { CAR } ; CDR } ;
                                                   DIP { DROP } ;
                                                   SWAP ;
                                                   PAIR ;
                                                   SWAP ;
                                                   PAIR ;
                                                   DIP { DUP ; DIP { CAR } ; CDR } ;
                                                   DIP { DROP } ;
                                                   SWAP ;
                                                   PAIR } ;
                                             DROP ;
                                             NIL operation ;
                                             PAIR } } } } } } } } } }
    `;
    const michelson_storage = 'Pair {} (Pair "tz1WpPzK6NwWVTJcXqFvYmoA6msQeVy1YP6z" (Pair False 1000000))';
    const result = await TezosNodeWriter.sendContractOriginationOperation(tezosNode, keystore, 0, undefined, false, true, 100000, '', 1000, 100000, michelson, michelson_storage, TezosParameterFormat.Michelson);

    console.log(`Injected operation group id ${result.operationGroupID}`);
}

deployContract();